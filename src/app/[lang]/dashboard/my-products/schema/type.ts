import { productBadgeColorSchema } from "./schema";

export type ProductDataItem = {
    id: number;
    item_image: string;
    item_name: string;
    status: keyof typeof productBadgeColorSchema;
    upload_date: string;
    price: string;
    quantity: string;
    category: string;
    [key: string]: any
};