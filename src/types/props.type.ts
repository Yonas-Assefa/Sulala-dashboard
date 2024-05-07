import { SelectInputSchema } from "./input-field.type"

type BaseInputProps = {
    id?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label: string
    name?: string
    autoComplete?: string
    error?: boolean
    onClear: () => void
}

export type TextInputProps = BaseInputProps

export type SelectInputProps = BaseInputProps & {
    multi?: boolean
    options?: string[]
}

export type CustomSelectInputProps = BaseInputProps & {
    multi?: boolean
    nested?: boolean
    withImage?: boolean
    options?: string[]
    data?: SelectInputSchema[]
}

export type FileInputProps = Pick<BaseInputProps, 'onChange' | 'label' | 'name' | 'error' | 'onClear'> & {
    value: FileList | null
}

export type SignupProps = {
    searchParams: {
        by: 'phone' | 'email' | undefined
    }
}