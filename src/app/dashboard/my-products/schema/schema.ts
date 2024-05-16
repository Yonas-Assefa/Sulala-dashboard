import { TableSchema } from "@/types/table.type";

export const productBadgeColorSchema = {
    active: 'bg-[#edfbe6] text-[#1d7941]',
    archived: 'bg-[#f6f6f6] text-[#52565d]',
    draft: 'bg-[#fef6d0] text-[#43464c]',
    new: 'bg-[#f0f5ff] text-[#1e3a8a]',
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
            key: 'title',
            title: 'Item',
            type: 'string',
            image: true,
            image_key: 'images',
        },
        {
            key: 'status',
            title: 'Status',
            type: 'string',
            badge: true,
            schema_colors: productBadgeColorSchema,
        },
        {
            key: 'uploadDate',
            title: 'Upload date',
            type: 'date',
        },
        {
            key: 'price',
            title: 'Price',
            type: 'money',
        },
        {
            key: 'inventory',
            title: 'Quantity',
            type: 'pieces',
        },
        {
            key: 'category',
            title: 'Category',
            type: 'string',
            referenced: true,
            reference_key: 'categories'
        },
    ]
}