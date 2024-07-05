"use server";

import { GOOGLE_MAPS_GEOCODE_URL, GOOGLE_MAPS_KEY } from "../../config/urls";

export const getLocationGeoCode = async (
  address: string,
): Promise<{ lat: string; lng: string }> => {
  console.log({ address });
  const response = await fetch(
    `${GOOGLE_MAPS_GEOCODE_URL}?address=${address}&key=${GOOGLE_MAPS_KEY}`,
  );
  const data = await response.json();
  return data?.results[0]?.geometry?.location;
};
