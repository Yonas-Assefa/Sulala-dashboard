import React from "react";

type RadioInputOptions = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  label?: string;
  name?: string;
  error?: string;
  options: RadioInputOptions[];
  defaultValue?: string;
};

function RadioInput({ id, label, name, error, options, defaultValue }: Props) {
  const [selected, setSelected] = React.useState<string | null>(
    defaultValue || null,
  );

  return (
    <div className="bg-tertiary dark:bg-gray-700 rounded-[30px] p-8 flex flex-col gap-5">
      <h3 className="font-semibold text-xl">{label}</h3>
      <div className="flex flex-col gap-3 p-2">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={option.value}
            className="flex flex-row gap-2 items-center cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              id={option.value}
              onChange={() => setSelected(option.value)}
              checked={selected?.toLowerCase() == option.value?.toLowerCase()}
              value={option.value}
              className={`radio radio-success ${error ? "border-danger" : "border-secondary"}`}
            />
            <p
              className={`${error ? "text-danger" : "text-black dark:text-white"}`}
            >
              {option.label}
            </p>
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default RadioInput;
