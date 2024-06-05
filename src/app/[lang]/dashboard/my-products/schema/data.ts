import { ProductDataItem } from "./type"

export const productData: ProductDataItem[] = [
    {
        id: 1,
        item_image: '/images/milktake-silver.svg',
        item_name: 'Milktech Silver Premium',
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Pet Food and Treats',
    },
    {
        id: 2,
        item_image: '/images/pet-horse-cattle-shampoo.svg',
        item_name: 'Pet Horse Cattle Shampoo',
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Cleaning and Hygiene',
    },
    {
        id: 3,
        item_image: '/images/equigloss.svg',
        item_name: 'Equigloss 2in1 Conditioner',
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Cleaning and Hygiene',
    },
    {
        id: 4,
        item_image: '/images/milktake-silver.svg',
        item_name: 'Milktech Silver Premium',
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Pet Food and Treats',
    },
    {
        id: 5,
        item_image: '/images/pet-horse-cattle-shampoo.svg',
        item_name: 'Pet Horse Cattle Shampoo',
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Cleaning and Hygiene',
    },
    {
        id: 6,
        item_image: '/images/equigloss.svg',
        item_name: 'Equigloss 2in1 Conditioner',
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Cleaning and Hygiene',
    },
    {
        id: 7,
        item_image: '/images/milktake-silver.svg',
        item_name: 'Milktech Silver Premium',
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Pet Food and Treats',
    },
    {
        id: 8,
        item_image: '/images/pet-horse-cattle-shampoo.svg',
        item_name: 'Pet Horse Cattle Shampoo',
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Cleaning and Hygiene',
    },
    {
        id: 9,
        item_image: '/images/equigloss.svg',
        item_name: 'Equigloss 2in1 Conditioner',
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        quantity: '250pcs',
        category: 'Cleaning and Hygiene',
    },
]

export const productsSortData = [
    {
        label: 'Date',
        value: 'uploadDate'
    },
    {
        label: 'Product title',
        value: 'title'
    },
    {
        label: 'Price',
        value: 'price'
    }
]


export const productsFilterData = ['all', 'active', 'draft', 'archived']