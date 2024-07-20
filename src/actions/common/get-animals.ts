"use server";

import { notFound } from "next/navigation";
import { GET_ANIMALS } from "../../config/urls";
import {
  getRequestHeaders,
  getResponseBody,
  getResponseErrorMessage,
} from "../../lib/helper";
import { animalMapper } from "../mapper/animal-mapper";

export const getAnimals = async () => {
  const response = await fetch(GET_ANIMALS, {
    method: "GET",
    headers: getRequestHeaders(),
  });
  const body = await getResponseBody(response);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(getResponseErrorMessage(body) || "Failed to get animals");
  }
  const mappedAnimals = animalMapper(body.data?.results);
  return mappedAnimals;
};
