"use client";
import { contactSupport } from "@/actions/support/contact-support";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import BackButton from "@/components/common/ui/BackButton";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { useRedirectRoute } from "@/hooks/useRedirectRoute";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Link } from "@/i18n/navigation";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { useFormState } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function ForgotPassword() {
  const [formState, action] = useFormState(contactSupport, EMPTY_FORM_STATE);
  const [isSent, setIsSent] = useState(false);

  useToastMessage(formState);
  useRedirectRoute(formState);

  useEffect(() => {
    if (formState.status === "SUCCESS") {
      setIsSent(true);
    }
  }, [formState.status]);

  return (
    <div className="w-full h-full flex flex-row overflow-hidden relative">
      <div className="bg-gradient-to-b from-white dark:from-gray-600 to-primary/20 flex-grow">
        <div className="p-3 fixed">
          <BackButton />
        </div>
        <AnimatePresence>
          {!isSent && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="w-full h-full flex flex-col-reverse md:flex-row gap-8 justify-center items-center"
            >
              <form
                action={action}
                className="flex flex-col gap-4 w-full md:w-[400px] px-5 md:px-0"
              >
                <div className="flex flex-col gap-2">
                  <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    error={formState?.fieldErrors?.email?.[0]}
                  />
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    id="full_name"
                    name="full_name"
                    error={formState?.fieldErrors?.full_name?.[0]}
                  />
                  <TextAreaInput
                    label="Message"
                    placeholder="Enter your message"
                    id="message"
                    name="message"
                    error={formState?.fieldErrors?.message?.[0]}
                  />
                </div>
                <div className="flex justify-center flex-col w-full">
                  <PrimaryButton name="Send" />
                </div>
              </form>
              <div className="w-full md:w-[500px] px-8 md:px-0 flex flex-col gap-8 justify-center items-center relative">
                <img
                  src="/icons/contact.svg"
                  alt="Contact Us"
                  className="h-full opacity-10 absolute top-0"
                />
                <h1 className="font-bold text-3xl text-primary">
                  Contact Sulala.
                </h1>
                <p className="text-black dark:text-white text-justify z-10">
                  We first encourage you to go to{" "}
                  <Link
                    href={"/support/faq"}
                    className="text-primary font-semibold hover:cursor-pointer hover:underline"
                  >
                    FAQ
                  </Link>{" "}
                  and check if your question is already answered. If you could't
                  find help, please provide your first name, email address, and
                  message in the input fields below, and click the{" "}
                  <span className="bg-primary text-white text-[10px] p-1 px-4 rounded-lg cursor-pointer">
                    Send
                  </span>{" "}
                  button. Our team will respond to your inquiry within 72 hours.
                </p>
                <div className="flex flex-row gap-3 items-center">
                  <img src="/sulala-logo.svg" alt="" />
                  <p className="text-primary font-semibold">Sulala.com</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            className="w-full h-full flex flex-col-reverse md:flex-row gap-8 justify-center items-center"
          >
            <div className="w-full md:w-[500px] px-8 md:px-0 flex flex-col gap-8 justify-center items-center relative">
              <img
                src="/icons/contact.svg"
                alt="Contact Us"
                className="h-full opacity-10 absolute top-0"
              />
              <h1 className="font-bold text-3xl text-primary">
                We have recieved your message!
              </h1>
              <p className="text-black text-justify z-10">
                Our team will respond to your inquiry within 72 hours.
              </p>
              <div className="flex flex-row gap-3 items-center">
                <img src="/sulala-logo.svg" alt="" />
                <p className="text-primary font-semibold">Sulala.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
