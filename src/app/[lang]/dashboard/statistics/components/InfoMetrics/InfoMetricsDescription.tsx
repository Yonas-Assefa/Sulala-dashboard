import React from "react";

type InfoMetricsDescriptionProps = {
  label: string;
  descriptions: {
    title: string;
    content: string;
  }[];
};

function InfoMetricsDescription({
  label,
  descriptions,
  onClick,
}: InfoMetricsDescriptionProps & { onClick: () => void }) {
  return (
    <div className="bg-tertiary p-3 row-span-2 flex flex-col gap-6 justify-between">
      <h2 className="font-bold text-black text-xl bg-white/50 text-center uppercase p-2">
        {label}
      </h2>
      <div className="flex-grow flex flex-col gap-3 justify-evenly">
        {descriptions.map((description, index) => (
          <div
            className="hover:bg-white p-2 cursor-pointer"
            key={index}
            onClick={onClick}
          >
            <h3 className="text-black font-semibold text-lg">
              {description.title}
            </h3>
            <p className="text-black/50">{description.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoMetricsDescription;
