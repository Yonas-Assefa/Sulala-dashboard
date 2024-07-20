import { constructImageUrl } from "@/lib/images";

type TDriverPartner = {
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

export const deliveryPartnersMapper = async (data: any) => {
  function convert(item: any) {
    if (!item) return {};
    return {
      ...item,
      profile_photo: constructImageUrl(item.profile_photo, true),
      license: constructImageUrl(item.license_front, true),
      license_front: constructImageUrl(item.license_front, true),
      license_back: constructImageUrl(item.license_back, true),
      civil_id: constructImageUrl(item.id_front, true),
      id_front: constructImageUrl(item.id_front, true),
      id_back: constructImageUrl(item.id_back, true),
      driver_name:
        item.first_name || item.last_name
          ? `${item.first_name} ${item.last_name}`
          : `${item.username} (username)`,
      online_status: item.is_active ? "Online" : "Offline",
      vehicle_driving: "Bike",
      availability: item.is_assigned ? "Assigned" : "Free",
      orders_delivered: (item.orders_delivered || 0) + "",
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
