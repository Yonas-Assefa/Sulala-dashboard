"use server";

import {
  GOOGLE_MAPS_AUTOCOMPLETE_URL,
  GOOGLE_MAPS_KEY,
} from "../../config/urls";

export const getLocationSuggetion = async (inputValue: string) => {
  const response = await fetch(
    `${GOOGLE_MAPS_AUTOCOMPLETE_URL}?input=${inputValue}&key=${GOOGLE_MAPS_KEY}`,
  );
  const data = await response.json();

  let places: { value: string; label: string }[] = [];
  data?.predictions?.map((place: { description: string }, i: number) => {
    places = [
      ...places,
      { value: place.description, label: place.description },
    ];
  });
  return places;
};
