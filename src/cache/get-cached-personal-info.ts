"use server";

import cache from "@/cache/node-cache";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import { cookies } from "next/headers";
import { decodeJwt } from "@/lib/decode-jwt";

export const getCachedPersonalInfo = async () => {
  const token = cookies().get("access")?.value || "";
  const decodedToken = token && decodeJwt(token);
  console.log({ decodedToken: decodedToken?.user_id });
  if (cache.has(`personal_info_${decodedToken?.user_id}`)) {
    return cache.get(`personal_info_${decodedToken?.user_id}`);
  }

  const personalInfo = await getPersonalInfo();

  cache.set(`personal_info_${decodedToken?.user_id}`, personalInfo);

  return personalInfo;
};

export const revalidateCachedPersonalInfo = async () => {
  const token = cookies().get("access")?.value || "";
  const decodedToken = token && decodeJwt(token);
  const personalInfo = await getPersonalInfo();
  cache.set(`personal_info_${decodedToken?.user_id}`, personalInfo);
  return personalInfo;
};

export const invalidateCachedPersonalInfo = () => {
  const token = cookies().get("access")?.value || "";
  const decodedToken = token && decodeJwt(token);
  cache.set(`personal_info_${decodedToken?.user_id}`, null);
};
