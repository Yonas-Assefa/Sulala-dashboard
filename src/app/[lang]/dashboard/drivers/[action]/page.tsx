import BackButton from "@/components/common/ui/BackButton";
import React from "react";

async function page() {
  return (
    <div className="text-black flex flex-col w-full h-full p-8 gap-10  overflow-y-scroll">
      <div className="flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif">
        <div className="mt-4">
          <BackButton />
        </div>
        <h2 className="capitalize text-2xl md:text-3xl">Manage Drivers</h2>
      </div>
      <div>TODO</div>
    </div>
  );
}

export default page;
