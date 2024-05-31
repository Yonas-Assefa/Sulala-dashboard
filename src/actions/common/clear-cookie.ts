'use server'

import { clearBrowserCookie } from "../../lib/helper"

export const clearCookie = async () => {
    clearBrowserCookie()
}