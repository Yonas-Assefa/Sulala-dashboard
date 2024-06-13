import BackButton from "@/components/common/ui/BackButton";

function ForgotPassword() {
  return (
    <div className="w-full h-full flex flex-row overflow-hidden">
      <div className="bg-white flex-grow">
        <div className="p-3">
          <BackButton />
        </div>
        <div className="w-full h-full flex justify-between flex-col items-center">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img
              src="/icons/contact.svg"
              alt=""
              className="opacity-80 w-[30px]"
            />
            <h1 className="text-4xl font-semibold text-primary">Contact</h1>
            <div className="flex flex-row justify-between gap-5">
              <a
                href="mailto:support@sulala.com"
                className="text-primary font-semibold hover:underline"
              >
                Support team!
              </a>
            </div>
            <img
              src="/icons/contact.svg"
              className="w-[100px] opacity-15 absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
