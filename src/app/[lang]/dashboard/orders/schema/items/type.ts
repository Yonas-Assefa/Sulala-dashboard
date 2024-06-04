import { OrderDataItem } from "../type"

export type OrderItemDataItem = OrderDataItem & {
    status: 'delivered' | 'cancelled' | 'in_delivery'
    items?: Items[]
};

type Items = {
    label: string
    value: string
    image: string
}