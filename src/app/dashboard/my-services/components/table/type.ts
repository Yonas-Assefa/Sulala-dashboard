import { ServicesBadgeColorSchema } from "./schema";

export type ServiceDataItem = {
    id: number
    service_name: string
    status: keyof typeof ServicesBadgeColorSchema
    upload_date: string
    price: string
    category: string
    [key: string]: any
};