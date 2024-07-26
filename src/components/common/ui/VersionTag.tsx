"use client";
import React from "react";

function VersionTag() {
  const [version, setVersion] = React.useState<string>("0.0.0");
  React.useEffect(() => {
    import("../../../../package.json").then((data) => {
      setVersion(data.version);
    });
  }, []);
  return (
    <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
      <p className="text-secondary text-xs">version {version}</p>
    </div>
  );
}

export default VersionTag;
