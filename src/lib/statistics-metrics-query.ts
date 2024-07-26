export const getStatisticsMetricsQuery = (formData?: FormData) => {
  const start_date = getFormDataItem("start_date", formData);
  const end_date = getFormDataItem("end_date", formData);
  const time_frame = getFormDataItem("time_frame", formData);
  const item_type = getFormDataItem("item_type", formData);

  return { start_date, end_date, time_frame, item_type };
};

const getFormDataItem = (key: string, formData?: FormData) => {
  const result = formData?.get(key) || "";
  if (result == "undefined") return "";
  return result;
};
