"use client";
import PhoneNumberInput from "./common/form/PhoneNumberInput";

import React from "react";

function AuthWithPhone({ error }: { error?: string }) {
  return (
    <div className="flex flex-col gap-3 w-full items-center">
      <PhoneNumberInput error={error} />
    </div>
  );
}

export default AuthWithPhone;
