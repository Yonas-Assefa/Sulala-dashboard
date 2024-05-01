const mockData: MockData = [
    {
        id: 1,
        item: {
            image: '/images/milktake-silver.svg',
            name: 'Milktech Silver Premium',
        },
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Pet Food and Treats',
    },
    {
        id: 2,
        item: {
            image: '/images/pet-horse-cattle-shampoo.svg',
            name: 'Pet Horse Cattle Shampoo',
        },
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Cleaning and Hygiene',
    },
    {
        id: 3,
        item: {
            image: '/images/equigloss.svg',
            name: 'Equigloss 2in1 Conditioner',
        },
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Cleaning and Hygiene',
    },
    {
        id: 4,
        item: {
            image: '/images/milktake-silver.svg',
            name: 'Milktech Silver Premium',
        },
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Pet Food and Treats',
    },
    {
        id: 5,
        item: {
            image: '/images/pet-horse-cattle-shampoo.svg',
            name: 'Pet Horse Cattle Shampoo',
        },
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Cleaning and Hygiene',
    },
    {
        id: 6,
        item: {
            image: '/images/equigloss.svg',
            name: 'Equigloss 2in1 Conditioner',
        },
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Cleaning and Hygiene',
    },
    {
        id: 7,
        item: {
            image: '/images/milktake-silver.svg',
            name: 'Milktech Silver Premium',
        },
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Pet Food and Treats',
    },
    {
        id: 8,
        item: {
            image: '/images/pet-horse-cattle-shampoo.svg',
            name: 'Pet Horse Cattle Shampoo',
        },
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Cleaning and Hygiene',
    },
    {
        id: 9,
        item: {
            image: '/images/equigloss.svg',
            name: 'Equigloss 2in1 Conditioner',
        },
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        quantity: 250,
        category: 'Cleaning and Hygiene',
    },
]

type MockData = {
    id: number
    item: {
        image: string
        name: string
    }
    status: keyof typeof productStatusColors
    upload_date: string
    price: string
    quantity: number
    category: string
}[]

export const productStatusColors = {
    active: 'bg-[#edfbe6] text-[#1d7941]',
    archived: 'bg-[#f6f6f6] text-[#52565d]',
    draft: 'bg-[#fef6d0] text-[#43464c]',
}

export default mockData