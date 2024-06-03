export type SelectInputSchema = {
    value: string
    label: string
    image?: string
    disabled?: boolean
    options?: {
        value: string
        label: string
        disabled?: boolean
    }[]
}

export type InputMeta = {
    id: string
    type: 'select' | 'text',
    placeholder: string
    options?: string[]
    label: string,
    props?: object
}

export type RadioInputOptions = {
    id: string
    label: string
    value: string
    input?: InputMeta | InputMeta[]
}

export type RadioInputSchema = RadioInputOptions & {
    options: RadioInputOptions[]
}