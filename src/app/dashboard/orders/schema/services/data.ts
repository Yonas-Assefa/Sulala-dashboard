import { OrderServiceDataItem } from "./type";

export const orderServiceData: OrderServiceDataItem[] = [
    {
        id: 1,
        order_number: '12345',
        status: "active",
        date: "12.03.24",
        price: 123,
        fee: 12,
        services: [
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            }
        ],
    },

    {
        id: 2,
        order_number: '12345',
        status: "active",
        date: "12.03.24",
        price: 123,
        fee: 12,
        services: [
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            },
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            }
        ],
    },
    {
        id: 3,
        order_number: '12345',
        status: "inactive",
        date: "12.03.24",
        price: 123,
        fee: 12,
        services: [
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            },
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            }
        ],
    },
    {
        id: 4,
        order_number: '12345',
        status: "active",
        date: "12.03.24",
        price: 123,
        fee: 12,
        services: [
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            }
        ],
    },

    {
        id: 5,
        order_number: '12345',
        status: "inactive",
        date: "12.03.24",
        price: 123,
        fee: 12,
        services: [
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            },
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            },
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            }
        ],
    },
    {
        id: 6,
        order_number: '12345',
        status: "inactive",
        date: "12.03.24",
        price: 123,
        fee: 12,
        services: [
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            },
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            },
            {
                label: 'Pet, Horse & Cattle Shampoo',
                value: 'pet_hourse_cattle_shampoo',
                image: '/images/milktake-silver.svg'
            }
        ],
    },
]

export const orderServiceSortData = [
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

export const orderServiceFilterData = ['all', 'active', 'inactive']
