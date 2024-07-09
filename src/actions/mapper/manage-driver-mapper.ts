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
    return item;
  }
  if (Array.isArray(data)) {
    return data.map((shop: any) => {
      return convert(shop);
    });
  } else {
    return convert(data);
  }
};
