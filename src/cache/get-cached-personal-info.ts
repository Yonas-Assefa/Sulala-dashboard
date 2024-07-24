"use server";

import cache from "@/cache/node-cache";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";
import { cookies } from "next/headers";
import { decodeJwt } from "@/lib/decode-jwt";

let isFetchingPersonalInfo = false;

export const getCachedPersonalInfo = async () => {
  while (isFetchingPersonalInfo) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  isFetchingPersonalInfo = true;

  try {
    const token = cookies().get("access")?.value || "";
    const decodedToken = token && decodeJwt(token);

    const cachedPersonalInfo = cache.has(
      `personal_info_${decodedToken?.user_id}`,
    )
      ? cache.get(`personal_info_${decodedToken?.user_id}`)
      : null;

    if (cachedPersonalInfo) {
      return cache.get(`personal_info_${decodedToken?.user_id}`);
    }

    const personalInfo = await getPersonalInfo();
    if (personalInfo && isValidForCache(personalInfo)) {
      cache.set(`personal_info_${decodedToken?.user_id}`, personalInfo);
    } else {
    }

    return personalInfo;
  } finally {
    isFetchingPersonalInfo = false;
  }
};

export const revalidateCachedPersonalInfo = async () => {
  const token = cookies().get("access")?.value || "";
  const decodedToken = token && decodeJwt(token);
  const personalInfo = await getPersonalInfo();
  if (personalInfo && isValidForCache(personalInfo)) {
    cache.set(`personal_info_${decodedToken?.user_id}`, personalInfo);
  } else {
  }
  return personalInfo;
};

export const invalidateCachedPersonalInfo = () => {
  const token = cookies().get("access")?.value || "";
  const decodedToken = token && decodeJwt(token);
  cache.set(`personal_info_${decodedToken?.user_id}`, null);
};

type TPersonalInfo = {
  is_superuser: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  is_password_set: boolean;
  has_onboarded: boolean;
};
const isValidForCache = (personalInfo: TPersonalInfo) => {
  return (
    personalInfo?.is_superuser ||
    (personalInfo &&
      (personalInfo.email_verified || personalInfo.phone_verified) &&
      personalInfo.is_password_set &&
      personalInfo.has_onboarded)
  );
};
