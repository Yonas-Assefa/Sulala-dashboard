'use server'

import { FormState, toFormState } from "@/utils/formStateHelper"
import { LOGOUT } from "../config/urls"
import { clearBrowserCookie, getRequestHeaders, } from "../utils/helper"
import { redirect } from "next/navigation"

export const logout = async (
    formState: FormState,
    formData: FormData
) => {
    // await fetch(LOGOUT, {
    //     method: 'POST',
    //     headers: getRequestHeaders()
    // })

    clearBrowserCookie()

    redirect('/auth/sign-in')
}