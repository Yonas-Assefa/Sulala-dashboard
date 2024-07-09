import { constructImageUrl, deconstructImageUrl } from "@/lib/images";

type TManageDriver = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
  license_number: string;
  profile_photo: string;
  license_front: string;
  license_back: string;
  id_front: string;
  id_back: string;
  address: string;
};

export const manageDriversMapper = async (data: any) => {
  function convert(item: any) {
    if (!item) return {};
    return {
      ...item,
      profile_photo: constructImageUrl(item.profile_photo, true),
      license_front: constructImageUrl(item.license_front, true),
      license_back: constructImageUrl(item.license_back, true),
      id_front: constructImageUrl(item.id_front, true),
      id_back: constructImageUrl(item.id_back, true),
    };
  }
  if (Array.isArray(data)) {
    return data.map((shop: any) => {
      return convert(shop);
    });
  } else {
    return convert(data);
  }
};
