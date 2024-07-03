import { constructImageUrl, deconstructImageUrl } from "@/lib/images";
import { TPromotion } from "@/types/mapper.type";

type OptArgs = {
  tableSearch?: boolean;
  // data: TPromotion[] | TPromotion;
  data: any;
};

export const promotionMapper = <T>({ tableSearch, data }: OptArgs): T => {
  function convert(item: TPromotion) {
    if (tableSearch)
      return {
        id: item.id,
        name: item.name,
        tableSearch,
      };
    return {
      ...item,
      number_of_clicks: item.noc || 0,
      campaign_name: item.name,
      amount_spend: 0,
      start_date: new Date(item.start_date).toLocaleString(),
      end_date: new Date(item.end_date).toLocaleString(),
      impressions: item.impressions || 0,
      ad_files: constructImageUrl(item.ad_files, true),
      deconstructed_ad_files: deconstructImageUrl(item.ad_files?.[0]),
    };
  }

  if (Array.isArray(data)) {
    return data.map((promotion: any) => {
      return convert(promotion);
    }) as T;
  } else {
    return convert(data) as T;
  }
};
