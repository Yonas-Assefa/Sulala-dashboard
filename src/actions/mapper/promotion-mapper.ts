import { constructImageUrl, deconstructImageUrl } from "@/lib/images"
import { changeISOToLocaleDate } from "@/utils/dateFormatter.util"

type OptArgs = {
    tableSearch?: boolean
    data: any
}

export const promotionMapper = ({ tableSearch, data }: OptArgs) => {

    function convert(item: any) {
        if (tableSearch) return {
            id: item.id,
            name: item.name,
            tableSearch
        }
        return {
            ...item,
            number_of_clicks: item.noc || 0,
            campaign_name: item.name,
            amount_spend: 0,
            start_date: changeISOToLocaleDate({ val: item.start_date, useDash: true }),
            end_date: changeISOToLocaleDate({ val: item.end_date, useDash: true }),
            impressions: item.impressions || 0,
            ad_files: constructImageUrl(item.ad_files, true),
            deconstructed_ad_files: deconstructImageUrl(item.ad_files?.[0])
        }
    }

    if (Array.isArray(data)) {
        return data.map((promotion: any) => {
            return convert(promotion)
        })
    } else {
        return convert(data)
    }
}