import { RadioInputSchema, SelectInputSchema } from "./input-field.type"

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

export type CustomRadioInputProps = {
    inputForEach?: boolean
    showLabel?: boolean
    id: string
    data?: RadioInputSchema
}

type AcceptFileFormate = 'image/*' | 'audio/*' | 'video/*' | 'application/pdf' | 'application/msword' | '.pdf' | '.jpeg' | '.png' | '.jpg' | '.doc' | '.docx' | '.xls' | '.xlsx' | '.csv' | '.txt'

export type FileInputProps = Pick<BaseInputProps, 'onChange' | 'label' | 'name' | 'error' | 'onClear'> & {
    value: FileList | null
    accept: AcceptFileFormate[]
}

export type SignupProps = {
    searchParams: {
        by: 'phone' | 'email' | undefined
    }
}