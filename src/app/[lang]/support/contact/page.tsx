"use client";
import TextAreaInput from "@/components/common/form/TextAreaInput";
import TextInput from "@/components/common/form/TextInput";
import BackButton from "@/components/common/ui/BackButton";
import PrimaryButton from "@/components/common/ui/PrimaryButton";

function ForgotPassword() {
  return (
    <div className="w-full h-full flex flex-row overflow-hidden relative">
      <div className="bg-gradient-to-b from-white to-primary/20 flex-grow">
        <div className="p-3 fixed">
          <BackButton />
        </div>
        <div className="w-full h-full flex flex-col-reverse md:flex-row gap-8 justify-center items-center">
          <form className="flex flex-col gap-4 w-full md:w-[400px] px-5 md:px-0">
            <div className="flex flex-col gap-2">
              <TextInput label="Email" placeholder="Enter your email" />
              <TextInput label="Full Name" placeholder="Enter your full name" />
              <TextAreaInput label="Message" placeholder="Enter your message" />
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
            <h1 className="font-bold text-3xl text-primary">Contact Sulala.</h1>
            <p className="text-black text-justify">
              Please provide your first name, email address, and message in the
              input fields below, and click the 'Submit' button. Our team will
              respond to your inquiry within 72 hours.
            </p>
            <div className="flex flex-row gap-3 items-center">
              <img src="/sulala-logo.svg" alt="" />
              <p className="text-primary font-semibold">Sulala.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
