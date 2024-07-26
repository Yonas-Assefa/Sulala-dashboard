import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

type Props = {
  onChange?: (value: DateValueType) => void;
  value?: DateValueType;
};
function DateRangeSelector({ onChange, value: incomingVal }: Props) {
  const [value, setValue] = useState<DateValueType>(
    incomingVal || {
      startDate: null,
      endDate: null,
    },
  );

  const { lang } = useParams();
  const t = useTranslations("Commons");

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (
      (incomingVal?.endDate &&
        incomingVal?.startDate &&
        incomingVal?.endDate !== value?.endDate) ||
      incomingVal?.startDate !== value?.startDate
    ) {
      setValue(
        incomingVal || {
          startDate: null,
          endDate: null,
        },
      );
    }
  }, [incomingVal]);

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
