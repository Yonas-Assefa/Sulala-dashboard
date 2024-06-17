import { getCategories } from "../common/get-categories";
import { constructImageUrl, deconstructImageUrl } from "@/lib/images";

export const manageCustomerSupport = async (data: any) => {
  function convert(item: any) {
    if (!item) return {};
    return {
      full_name: item.full_name,
      email: item.email,
      message: item.message,
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
