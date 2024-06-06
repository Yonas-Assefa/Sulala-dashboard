'use server'

import { FormState, toFormState } from "@/utils/formStateHelper"
import { LOGOUT } from "../../config/urls"
import { clearBrowserCookie, getRequestHeaders, } from "../../lib/helper"
import { redirect } from "@/i18n/navigation"

export const logout = async () => {
    await fetch(LOGOUT, {
        method: 'POST',
        headers: getRequestHeaders()
    })

    clearBrowserCookie()

    redirect('/auth/sign-in')
}