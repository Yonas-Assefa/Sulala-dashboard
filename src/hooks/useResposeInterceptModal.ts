import { FormState } from "@/utils/formStateHelper";
import { usePathname, useRouter } from "@/i18n/navigation";
import React from "react";
import { closeModal, openModal } from "@/lib/modals";
import pushNotification from "@/utils/pushNotification.util";

type HookProps = {
  redirect: string;
  FnArgs: any;
  Fn: Function;
  notification: string;
  formState: FormState;
  message: string;
  modalId: string;
};
export const useResponseInterceptModal = ({
  formState,
  message,
  modalId,
  notification,
  FnArgs,
  Fn,
  redirect,
}: HookProps) => {
  const router = useRouter();

  React.useEffect(() => {
    if (formState.message == message) {
      setTimeout(async () => {
        const confirm = await openModal(modalId, true);
        closeModal(modalId);

        if (!confirm)
          return pushNotification("Request action cancelled!", "warning");

        pushNotification(notification, "info");
        Fn(FnArgs).then((res: FormState) => {
          if (res.status == "SUCCESS") {
            pushNotification(res.message, "success");
            router.push(redirect as any);
          } else {
            pushNotification(res.message, "error");
          }
        });
      }, 1000);
    }
  }, [formState]);
};
