import { servicesBadgeColorSchema } from "./schema";

export type ServiceDataItem = {
    id: number
    service_name: string
    status: keyof typeof servicesBadgeColorSchema
    upload_date: string
    price: string
    category: string
    [key: string]: any
};