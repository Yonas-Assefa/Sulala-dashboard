import { TableSchema } from "@/components/common/table/table.type";

const tabSchema = ['all', 'active', 'draft', 'archived']

const colorSchema = {
    active: 'bg-[#edfbe6] text-[#1d7941]',
    completed: 'bg-[#f6f6f6] text-[#52565d]',
    scheduled: 'bg-[#fef6d0] text-[#43464c]',
    paused: 'bg-[#fde7e7] text-[#b91c1c]',
}

const tableSchema: TableSchema = {
    include: {
        checkbox: true,
        actions: {
            edit: true,
            delete: true,
            toggle: true,
            promote: false
        }
    },
    schema: [
        {
            key: 'campaign_name',
            title: 'Campaign name',
            type: 'string',
            image: false,
            image_key: undefined,
        },
        {
            key: 'promotion_type',
            title: 'Promotion type',
            type: 'string',
            image: false,
            image_key: undefined,
        },
        {
            key: 'status',
            title: 'Status',
            type: 'string',
            badge: true,
            schema_colors: colorSchema,
        },
        {
            key: 'start_date',
            title: 'Start date',
            type: 'date',
        },
        {
            key: 'end_date',
            title: 'End date',
            type: 'date',
        },
        {
            key: 'impressions',
            title: 'Impressions',
            type: 'number',
        },
        {
            key: 'number_of_clicks',
            title: 'NoC',
            type: 'number',
            tooltips: 'Number of clicks'
        },
        {
            key: 'amount_spend',
            title: 'Amount spend',
            type: 'number',
        }
    ]
}

type MockDataItem = {
    id: number
    campaign_name: string
    promotion_type: string
    status: 'active' | 'completed' | 'scheduled' | 'paused'
    start_date: string
    end_date: string
    impressions: number
    number_of_clicks: number
    amount_spend: number
    [key: string]: any
};

export type MockData = MockDataItem[]

export { tabSchema, tableSchema }