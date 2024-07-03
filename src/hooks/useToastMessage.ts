import { Console } from "@/lib/print";
import { FormState } from "@/utils/formStateHelper";
import pushNotification from "@/utils/pushNotification.util";
import { useRef, useEffect } from "react";

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message && formState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.message.includes("[HTML_RESPONSE]")) {
        pushNotification("Unexpected response from server", "error");
        Console.error({
          error: "Unexpected response from server",
          errorCode: "RECEIVED_HTML_RESPONSE",
          response: formState.message.replace("[HTML_RESPONSE]", ""),
        });
      } else if (formState.status === "ERROR") {
        pushNotification(formState.message, "error");
      } else if (formState.status === "INFO") {
        pushNotification(formState.message, "info");
      } else {
        pushNotification(formState.message, "success");
      }
      prevTimestamp.current = formState.timestamp;
    }
  }, [formState, showToast]);
};

export { useToastMessage };
