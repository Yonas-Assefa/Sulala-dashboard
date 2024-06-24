import { useScrollToErrorField } from "@/hooks/useScrollToErrorField";
import React, { useEffect } from "react";

type Props = {
  id?: string;
  value?: string;
  setValue?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
  error?: string;
  onClear?: () => void;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
};

function TextAreaInput({
  id,
  name,
  label,
  placeholder,
  error,
  defaultValue,
  setValue,
  value,
  required,
  disabled,
  className,
  autoFocus,
}: Props) {
  const ref = useScrollToErrorField<HTMLDivElement>(error);

  const props = {};
  if (value) {
    Object.assign(props, { value });
  }
  if (setValue) {
    Object.assign(props, {
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value),
    });
  }

  useEffect(() => {
    if (setValue && defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  // try {
  //   const response = await fetch( `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=%28cities%29&components=country:${selectedHomeCountryOption.value}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
  //   );
  //   const data = await response.json();
  //   let places = [];
  //   data?.data?.predictions?.map((place, i) => {
  //     places = [
  //       ...places,
  //       { value: place.description, label: place.description },
  //     ];
  //   });
  //   callback(places);
  // } catch (error) {
  //   console.error(error);
  // }

  // const loadDestinationCityOptions = async (inputValue, callback) => {
  //   if (inputValue) {
  //     try {
  //       const response = await fetch( `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
  //       );
  //       const data = await response.json();
  //       let places = [];
  //       data?.data?.predictions?.map((place, i) => {
  //         places = [
  //           ...places,
  //           { value: place.description, label: place.description },
  //         ];
  //       });

  //       callback(places);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // const getGeoLocation = async (address) => {
  //   try {
  //     const response = await fetch(       `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
  //   );
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchData = async () => {
  //     try {
  //       if (selectedDestinationCityOption && selectedHomeCityOption) {
  //         const destinationData = await getGeoLocation(
  //           selectedDestinationCityOption.value
  //         );
  //         const homeData = await getGeoLocation(selectedHomeCityOption.value);
  //         if (isMounted) {           setDestinationGeoLocation(destinationData);
  //           setHomeGeoLocation(homeData);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [
  //   selectedHomeCountryOption,
  //   selectedHomeCityOption,
  //   selectedDestinationCityOption,
  // ]);

  return (
    <div ref={ref} className={`flex flex-col gap-3 ${className}`}>
      <label htmlFor={id} className="self-start text-black dark:text-white">
        {label}
        {required && (
          <span className="text-danger">
            *&nbsp;
            {/* <sup className='text-xs opacity-70'>(required)</sup> */}
          </span>
        )}
      </label>
      <textarea
        name={name}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`textarea focus:border-primary outline-none focus:outline-none disabled:bg-white disabled:text-secondary disabled:border-secondary/50 textarea-bordered rounded-[20px] textarea-lg w-full text-black ${error ? "bg-dangerlight border-danger" : "bg-white"}`}
        {...props}
      ></textarea>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

export default TextAreaInput;
