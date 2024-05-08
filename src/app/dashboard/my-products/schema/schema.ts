import { TableSchema } from "@/types/table.type";

export const productBadgeColorSchema = {
    active: 'bg-[#edfbe6] text-[#1d7941]',
    archived: 'bg-[#f6f6f6] text-[#52565d]',
    draft: 'bg-[#fef6d0] text-[#43464c]',
}

export const productTableSchema: TableSchema = {
    include: {
        checkbox: true,
        actions: {
            edit: true,
            delete: true,
            promote: true,
            toggle: false
        }
    },
    schema: [
        {
            key: 'id',
            title: '№',
            type: 'number',
        },
        {
            key: 'item_name',
            title: 'Item',
            type: 'string',
            image: true,
            image_key: 'item_image',
        },
        {
            key: 'status',
            title: 'Status',
            type: 'string',
            badge: true,
            schema_colors: productBadgeColorSchema,
        },
        {
            key: 'upload_date',
            title: 'Upload date',
            type: 'date',
        },
        {
            key: 'price',
            title: 'Price',
            type: 'string',
        },
        {
            key: 'quantity',
            title: 'Quantity',
            type: 'number',
        },
        {
            key: 'category',
            title: 'Category',
            type: 'string',
        },
    ]
}