import { EMPTY_FORM_STATE, FormState, fromErrorToFormState, toFormState } from "@/utils/formStateHelper";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToastMessage } from "./useToastMessage";
import { useRedirectRoute } from "./useRedirectRoute";

type Props = {
    Fn: (data: any) => Promise<any>
    successRedirectUrl: string
    successMessage: string
    validate: (formData: FormData) => { data: any, errors: any }
}
export const useFormAction = ({ Fn, successMessage, successRedirectUrl, validate }: Props) => {
    const [formState, setFormState] = useState<FormState>(EMPTY_FORM_STATE)

    useToastMessage(formState);
    useRedirectRoute(formState);

    const { isPending, mutate } = useMutation({
        mutationFn: Fn,
        onError: (error) => {
            setFormState(fromErrorToFormState(error))
        },
        onSuccess: async (data) => {
            try {
                const body = await data.json()
                if (!data.ok || !body.success) {
                    const message = (body.message || 'Failed to sign up');
                    throw new Error(message)
                } else {
                    setFormState(toFormState('SUCCESS', `Signup successful! ${successMessage}.`, successRedirectUrl))
                }
            } catch (error) {
                setFormState(fromErrorToFormState(error))
            }
        }
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const { data } = validate(formData)


        try {
            mutate(data)
        } catch (error) {
        }
    }

    return { formState, onSubmit, isPending }
}