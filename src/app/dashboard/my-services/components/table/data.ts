import { ServiceDataItem } from "./type"

export const serviceData: ServiceDataItem[] = [
    {
        id: 1,
        service_name: 'Grooming for cows',
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 2,
        service_name: 'Grooming for hourses',
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 3,
        service_name: 'Washing for cows',
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 4,
        service_name: 'Washing for hourses',
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 5,
        service_name: 'Grooming for sheeps',
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 6,
        service_name: 'Grooming for calves',
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 7,
        service_name: 'Washing for sheeps',
        status: 'active',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 8,
        service_name: 'Washing for calves',
        status: 'archived',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
    {
        id: 9,
        service_name: 'Grooming for sheeps',
        status: 'draft',
        upload_date: '12.03.24',
        price: '$123',
        category: 'Grooming services',
    },
]

export const ServicesSortData = [
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


export const ServicesFilterData = ['all', 'active', 'draft', 'archived']
