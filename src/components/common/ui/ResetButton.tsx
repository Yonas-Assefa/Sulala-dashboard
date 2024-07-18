import React from "react";

type Props = {
  handleClear: () => void;
  show: boolean;
};
function ResetButton({ handleClear, show }: Props) {
  return (
    <button
      className={!show ? "invisible" : "visible"}
      type="reset"
      onClick={handleClear}
    >
      <img src="/x-circle.svg" alt="" className="mr-0 stroke-emerald-500" />
    </button>
  );
}

export default ResetButton;
