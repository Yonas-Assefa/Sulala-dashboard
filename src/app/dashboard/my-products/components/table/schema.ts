const tabSchema = ['all', 'active', 'draft', 'archived']

const colorSchema = {
    active: 'bg-[#edfbe6] text-[#1d7941]',
    archived: 'bg-[#f6f6f6] text-[#52565d]',
    draft: 'bg-[#fef6d0] text-[#43464c]',
}

const tableSchema = {
    include: {
        checkbox: true,
        actions: {
            edit: true,
            delete: true,
            promote: true,
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
            schema_colors: colorSchema,
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

type MockDataItem = {
    id: number;
    item_image: string;
    item_name: string;
    status: keyof typeof colorSchema;
    upload_date: string;
    price: string;
    quantity: string;
    category: string;
    [key: string]: any
};

export type MockData = MockDataItem[]

export { tabSchema, tableSchema }