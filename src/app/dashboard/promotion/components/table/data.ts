import { PromotionDataItem } from "./type";

export const promotionData: PromotionDataItem[] = [
    {
        id: 1,
        campaign_name: 'Campaign 1',
        promotion_type: 'Promotion Type 1',
        status: 'active',
        start_date: '2022-01-01',
        end_date: '2022-01-31',
        impressions: 1000,
        number_of_clicks: 100,
        amount_spend: 1000
    },
    {
        id: 2,
        campaign_name: 'Campaign 2',
        promotion_type: 'Promotion Type 2',
        status: 'completed',
        start_date: '2022-02-01',
        end_date: '2022-02-28',
        impressions: 2000,
        number_of_clicks: 200,
        amount_spend: 2000
    },
    {
        id: 3,
        campaign_name: 'Campaign 3',
        promotion_type: 'Promotion Type 3',
        status: 'paused',
        start_date: '2022-03-01',
        end_date: '2022-03-31',
        impressions: 3000,
        number_of_clicks: 300,
        amount_spend: 3000
    },
    {
        id: 4,
        campaign_name: 'Campaign 4',
        promotion_type: 'Promotion Type 4',
        status: 'active',
        start_date: '2022-04-01',
        end_date: '2022-04-30',
        impressions: 4000,
        number_of_clicks: 400,
        amount_spend: 4000
    },
    {
        id: 5,
        campaign_name: 'Campaign 5',
        promotion_type: 'Promotion Type 5',
        status: 'scheduled',
        start_date: '2022-05-01',
        end_date: '2022-05-31',
        impressions: 5000,
        number_of_clicks: 500,
        amount_spend: 5000
    },
    {
        id: 6,
        campaign_name: 'Campaign 6',
        promotion_type: 'Promotion Type 6',
        status: 'completed',
        start_date: '2022-06-01',
        end_date: '2022-06-30',
        impressions: 6000,
        number_of_clicks: 600,
        amount_spend: 6000
    },
]

export const promotionSortData = [
    {
        label: 'Date',
        value: 'date'
    },
    {
        label: 'Product title',
        value: 'product_title'
    },
    {
        label: 'Created',
        value: 'created'
    }
]

export const promotionFilterData = ['all', 'active', 'draft', 'archived']
