const mockData: MockData = [
    {
        id: 1,
        service: {
            name: 'Grooming for cows',
        },
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 2,
        service: {
            name: 'Grooming for hourses',
        },
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 3,
        service: {
            name: 'Washing for cows',
        },
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 4,
        service: {
            name: 'Washing for hourses',
        },
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 5,
        service: {
            name: 'Grooming for sheeps',
        },
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 6,
        service: {
            name: 'Grooming for calves',
        },
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 7,
        service: {
            name: 'Washing for sheeps',
        },
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 8,
        service: {
            name: 'Washing for calves',
        },
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 9,
        service: {
            name: 'Grooming for sheeps',
        },
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
]

type MockData = {
    id: number
    service: {
        name: string
    }
    status: keyof typeof productStatusColors
    upload_date: string
    price: string
    category: string
}[]

export const productStatusColors = {
    active: 'bg-[#edfbe6] text-[#1d7941]',
    archived: 'bg-[#f6f6f6] text-[#52565d]',
    draft: 'bg-[#fef6d0] text-[#43464c]',
}

export default mockData