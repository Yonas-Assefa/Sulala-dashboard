"use server";

import { GOOGLE_MAPS_GEOCODE_URL, GOOGLE_MAPS_KEY } from "../../config/urls";

type TGetLocationGeoCodeReturn =
  // {
  //   description: string;
  //   lat: string;
  //   long: string;
  //   is_manual: boolean;
  // };
  string;
export const getLocationGeoCode = async (
  address: string,
): Promise<TGetLocationGeoCodeReturn> => {
  console.log({ address });
  const response = await fetch(
    `${GOOGLE_MAPS_GEOCODE_URL}?address=${address}&key=${GOOGLE_MAPS_KEY}`,
  );
  const data = await response.json();
  // return {
  //   description: data?.results[0]?.formatted_address,
  //   lat: data?.results[0]?.geometry?.location.lat,
  //   long: data?.results[0]?.geometry?.location.lng,
  //   is_manual: false,
  // };
  return data?.results[0]?.formatted_address;
};
