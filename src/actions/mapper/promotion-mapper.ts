import { changeISOToLocaleDate } from "@/utils/dateFormatter.util"

export const promotionMapper = (data: any) => {
    if (Array.isArray(data)) {
        return data.map((promotion: any) => {
            return {
                ...promotion,
                number_of_clicks: promotion.noc || 0,
                campaign_name: promotion.name,
                amount_spend: 0,
                start_date: changeISOToLocaleDate({ val: promotion.start_date, useDash: true }),
                end_date: changeISOToLocaleDate({ val: promotion.end_date, useDash: true }),
                impressions: promotion.impressions || 0
            }
        })
    } else {
        return {
            ...data,
            number_of_clicks: data.noc,
            campaign_name: data.name,
            amount_spend: 0
        }
    }
}