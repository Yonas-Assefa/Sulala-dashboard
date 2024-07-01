import { constructImageUrl, deconstructImageUrl } from "@/lib/images";

type TPromotion = {
  id: number;
  name: string;
  noc: number;
  start_date: string;
  end_date: string;
  impressions: number;
  ad_files: string[];
};

type OptArgs = {
  tableSearch?: boolean;
  // data: TPromotion[] | TPromotion;
  data: any;
};

export const promotionMapper = ({ tableSearch, data }: OptArgs) => {
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
    });
  } else {
    return convert(data);
  }
};
