import { OrderDataItem } from "../type"

export type OrderServiceDataItem = OrderDataItem & {
    status: 'active' | 'inactive'
    services?: Service[]
};

type Service = {
    label: string
    value: string
    image: string
}