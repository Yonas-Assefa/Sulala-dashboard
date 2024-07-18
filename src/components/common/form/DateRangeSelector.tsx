import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

function DateRangeSelector() {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const { lang } = useParams();
  const t = useTranslations("Commons");

  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      i18n={lang as string}
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
      primaryColor={"emerald"}
      configs={{
        shortcuts: {
          today: t("today"),
          yesterday: t("yesterday"),
          past: (period) => t("last_sth_days", { days: period }),
          currentMonth: t("this_month"),
          pastMonth: t("last_month"),
        },
      }}
    />
  );
}

export default DateRangeSelector;
