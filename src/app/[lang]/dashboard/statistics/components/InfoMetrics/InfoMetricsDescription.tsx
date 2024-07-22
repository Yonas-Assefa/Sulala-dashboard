import React from "react";
import { ChartData, MetricsData } from "../../types/chart-props.type";

type InfoMetricsDescriptionProps = {
  label: string;
  metricsData: MetricsData[];
  chartData?: MetricsData;
  onClick: (id: string) => void;
};

function InfoMetricsDescription({
  label,
  chartData,
  metricsData,
  onClick,
}: InfoMetricsDescriptionProps) {
  return (
    <div className="bg-primary/5 rounded-lg p-3 row-span-2 flex flex-col gap-6 justify-between">
      <h2 className="font-bold text-black text-xl text-center uppercase p-2">
        {label}
      </h2>
      <div className="flex-grow flex flex-col gap-1 justify-start">
        {metricsData.map((metrics) => (
          <div
            className="collapse bg-tertiary"
            key={metrics.id}
            onClick={() => onClick(metrics.id)}
          >
            <input type="radio" name="my-accordion-1" className="peer" />
            <div className="collapse-title text-xl font-medium peer-[:checked]:bg-gradient-to-b peer-[:checked]:from-tertiary peer-[:checked]:to-white bg-white/40 text-black peer-[:checked]:text-primary">
              <h3 className="font-semibold text-lg">{metrics.title}</h3>
            </div>
            <div className="collapse-content bg-white">
              <p className="text-black/50">
                {metrics.content +
                  metrics.content +
                  metrics.content +
                  metrics.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoMetricsDescription;
