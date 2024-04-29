type BaseInputProps = {
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
}

export type FileInputProps = Pick<BaseInputProps, 'onChange' | 'label' | 'name' | 'error' | 'onClear'> & {
    value: FileList | null
}

export type SignupProps = {
    searchParams: {
        by: 'phone' | 'email' | undefined
    }
}