export type SelectInputSchema = {
    value: string
    label: string
    image?: string
    options?: {
        value: string
        label: string
    }[]
}