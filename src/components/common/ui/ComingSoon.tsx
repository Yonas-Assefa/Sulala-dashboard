import React from "react";

function ComingSoon() {
  return (
    <div className="bg-white/80 select-none absolute w-full h-full z-30 flex flex-col justify-center items-center">
      <img
        src="/sulala-logo.svg"
        alt="sulala logo"
        className="absolute -z-20 opacity-10 h-1/3"
      />
      <h1 className="text-4xl bg-gradient-to-t from-[#0e381e] via-[#1b8343] to-[#3ec772] bg-clip-text text-transparent font-bold">
        Coming Soon
      </h1>
    </div>
  );
}

export default ComingSoon;
