import PrimaryButton from "@/components/common/ui/PrimaryButton";
import TextInput from "@/components/common/form/TextInput";
import React from "react";

function EditServiceWorkTime() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <dialog id="edit_service_worktime_modal" className="modal">
      <div className="modal-box w-11/12 max-w-sm bg-white px-0">
        <div className="border-b-2 border-gray-200 pb-3">
          <h3 className="font-bold text-xl text-black text-center font-serif">
            Edit worktime
          </h3>
        </div>
        <div className="px-5 flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <TextInput id="from" placeholder="Enter time" label="From" />
              <TextInput id="to" placeholder="Enter time" label="To" />
            </div>
            <div className="form-control border rounded-[30px] overflow-hidden">
              {days.map((day, i) => {
                return (
                  <label
                    className={`cursor-pointer label p-4 ${i !== 6 && "border-b"}`}
                    key={day}
                  >
                    <span className="label-text text-black">{day}</span>
                    {/* <input type="checkbox" defaultChecked className="checkbox checkbox-success" /> */}
                    <input
                      type="checkbox"
                      className="checkbox checkbox-success border-secondary"
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <PrimaryButton name="Import" />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="text-black"></button>
      </form>
    </dialog>
  );
}

export default EditServiceWorkTime;
