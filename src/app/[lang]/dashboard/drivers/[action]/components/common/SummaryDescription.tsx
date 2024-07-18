import React from "react";

type Props = {
  title: string;
  description: string | undefined;
};
function SummaryDescription({ title, description }: Props) {
  return (
    <div className="flex flex-col gap-3 p-2">
      <h4 className="text-lg font-semibold capitalize">{title}</h4>
      {description ? (
        <p>{description}</p>
      ) : (
        <p className="text-black/50 italic text-sm font-normal">
          No description
        </p>
      )}
    </div>
  );
}

export default SummaryDescription;
