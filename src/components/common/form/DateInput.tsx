"use client";
import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import dayjs from "dayjs";
import React from "react";
type Props = {
  label: string;
  setValue?: (value: string) => void;
  id?: string;
  name?: string;
  error?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const extractDateAndTime = (dateTime: string | undefined) => {
  if (!dateTime) {
    return { time: "", date: "" };
  }

  const parsedDate = dayjs(dateTime);

  if (!parsedDate.isValid()) {
    return { time: "", date: "" };
  }

  const formattedDate = parsedDate.format("YYYY-MM-DD");
  const formattedTime = parsedDate.format("HH:mm");

  return {
    time: formattedTime,
    date: formattedDate,
  };
};

function DateInput({
  label,
  setValue,
  id,
  name,
  error,
  defaultValue,
  disabled,
}: Props) {
  const [time, setTime] = React.useState<string>(
    extractDateAndTime(defaultValue)?.time,
  );
  const [date, setDate] = React.useState<string>(
    extractDateAndTime(defaultValue)?.date,
  );

  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const timeInputRef = React.useRef<HTMLInputElement>(null);

  const ref = useScrollToErrorField<HTMLDivElement>(error);

  const openDateDropdown = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const openTimeDropdown = () => {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker();
    }
  };

  const props = {
    dateProps: {
      value: date,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDate(e.target.value),
    },
    timeProps: {
      value: time,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTime(e.target.value),
    },
  };

  const createDateTime = () => {
    if (!date || !time) return "";
    const dateTime = new Date(`${date}T${time}:00`);
    return dateTime.toLocaleString();
  };

  React.useEffect(() => {
    if (setValue) {
      const datetime = createDateTime();
      setValue(datetime);
    }
  }, [date, time]);

  return (
    <div ref={ref}>
      <p>{label}</p>
      <div
        className={`flex flex-col md:flex-row p-2 gap-2 w-full flex-wrap ${disabled && "opacity-50"}`}
      >
        <input
          type="text"
          name={name}
          id={id}
          hidden
          value={new Date(
            `${date || "2020-01-01"}T${time || "00:00"}:00`,
          )?.toISOString()}
          onChange={() => {}}
        />
        <label
          htmlFor={`${name}-date`}
          className={`border rounded-[30px] py-2 px-4 flex flex-row justify-between gap-3 ${error ? "bg-dangerlight border-danger" : "bg-white"}`}
        >
          <input
            disabled={disabled}
            onFocus={openDateDropdown}
            ref={dateInputRef}
            type="date"
            name={`${name}-date`}
            id={`${name}-date`}
            className="bg-transparent border-0 outline-none max-w-[150px]"
            placeholder="DD.MM.YYYY"
            {...props.dateProps}
          />
          <img src="/icons/calendar.svg" alt="" />
        </label>
        <label
          htmlFor={`${name}-time`}
          className={`border rounded-[30px] py-2 px-4 flex flex-row justify-between gap-3 ${error ? "bg-dangerlight border-danger" : "bg-white"}`}
        >
          <input
            disabled={disabled}
            onFocus={openTimeDropdown}
            ref={timeInputRef}
            type="time"
            name={`${name}-time`}
            id={`${name}-time`}
            className="bg-transparent border-0 outline-none max-w-[150px]"
            placeholder="00 : 00 AM"
            {...props.timeProps}
          />
          <img src="/icons/watch.svg" alt="" />
        </label>
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default DateInput;
