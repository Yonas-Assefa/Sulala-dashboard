export type SelectInputSchema = {
    value: string
    label: string
    image?: string
    options?: {
        value: string
        label: string
    }[]
}

export type InputMeta = {
    id: string
    type: 'select' | 'text',
    placeholder: string
    options?: string[]
    label: string
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