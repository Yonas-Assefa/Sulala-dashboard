import { EMPTY_FORM_STATE, FormState, fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToastMessage } from "./useToastMessage";
import { useRedirectRoute } from "./useRedirectRoute";


export const useFormSubmit = <T>({ Fn, Opt, validate }: {
    Fn: (data: T) => Promise<any>
    Opt: {
        successRedirectUrl?: string | (({ data, formState }: { data: T, formState: FormState, error: any }) => string)
        successMessage?: string | (({ data, formState }: { data: T, formState: FormState, error: any }) => string)
        failureMessage?: string | (({ data, formState }: { data: T, formState: FormState, error: any }) => string)
        failureRedirectUrl?: string | (({ data, formState }: { data: T, formState: FormState, error: any }) => string)
    }
    validate: (formData: FormData) => T
}) => {
    type TGetOptCallback = ({ data, formState }: { data: T, formState: FormState, error: any }) => string
    const [formState, setFormState] = useState<FormState>(EMPTY_FORM_STATE)
    const [inputData, setInputData] = useState({} as any)

    useToastMessage(formState);
    useRedirectRoute(formState);

    const { isPending, mutate } = useMutation({
        mutationFn: Fn,
        onError: (error) => {
            setFormState(fromErrorToFormState(error, getOptValue(Opt.failureRedirectUrl, error)))
        },
        onSuccess: async (data) => {
            try {
                const body = await data.json()
                if (!data.ok || !body.success) {
                    const message = (body.message || getOptValue(Opt.failureMessage) || 'Failed to submit the form');
                    throw new Error(message)
                } else {
                    setFormState(toFormState('SUCCESS', getOptValue(Opt.successMessage) || 'Succussfuly submited the form', getOptValue(Opt.successRedirectUrl)))
                }
            } catch (error) {
                setFormState(fromErrorToFormState(error, getOptValue(Opt.failureRedirectUrl, error)))
            }
        }
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement> | FormData) => {

        const formData = getFormData(e)
        try {
            const data = validate(formData)
            setInputData(data)
            mutate(data)
        } catch (error) {
            setFormState(fromErrorToFormState(error, getOptValue(Opt.failureRedirectUrl)))
        }
    }

    const getFormData = (e: React.FormEvent<HTMLFormElement> | FormData) => {
        if (e instanceof FormData) {
            return e
        }
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        return formData
    }


    const getOptValue = (value: string | TGetOptCallback | undefined, error?: any) => {
        if (typeof value === 'function') {
            console.log({ data: inputData, formState, error })
            return value({ data: inputData, formState, error })
        }
        if (typeof value === 'string') {
            return value
        }
        return ''
    }

    return { fieldErrors: formState.fieldErrors, onSubmit, loading: isPending }
}