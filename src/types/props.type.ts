import { ChangeEventHandler } from "react"
import { RadioInputSchema, SelectInputSchema } from "./input-field.type"

type BaseInputProps = {
    id?: string
    placeholder?: string
    label: string
    name?: string
    autoComplete?: string
    error?: boolean
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

export type FileInputProps = Pick<BaseInputProps, 'label' | 'name' | 'error'> & {
    accept: AcceptFileFormate[]
    handleFile: ChangeEventHandler<HTMLInputElement>
    file: FileList | null
}

export type SignupProps = {
    searchParams: {
        by: 'phone' | 'email' | undefined
    }
}