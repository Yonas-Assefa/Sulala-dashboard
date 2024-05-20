import { ChangeEventHandler } from "react"
import { RadioInputSchema, SelectInputSchema } from "./input-field.type"

type BaseInputProps = {
    id?: string
    placeholder?: string
    label: string
    name?: string
    autoComplete?: string
    error?: string
    value?: string,
    defaultValue?: string | { value: string, label: string } | { value: string, label: string }[] | null
    setValue?: (value: string) => void
}

export type TextInputProps = BaseInputProps & {
    type?: 'text' | 'email' | 'password' | 'number'
}

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
    searchable?: boolean
}

export type CustomRadioInputProps = {
    inputForEach?: boolean
    showLabel?: boolean
    id: string
    data?: RadioInputSchema
}

type AcceptFileFormate = 'image/*' | 'audio/*' | 'video/*' | 'application/pdf' | 'application/msword' | '.pdf' | '.jpeg' | '.png' | '.jpg' | '.doc' | '.docx' | '.xls' | '.xlsx' | '.csv' | '.txt'

export type FileInputProps = Pick<BaseInputProps, 'label' | 'name' | 'error' | 'id'> & {
    accept: AcceptFileFormate[]
    handleFile: ChangeEventHandler<HTMLInputElement>
    file: FileList | null
}

export type SignupProps = {
    searchParams: {
        by: 'phone' | 'email' | undefined
    }
}