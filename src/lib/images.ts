import { BASE_URL } from "@/config/urls"

export const constructImageUrl = (arg: string | string[], returnOne: boolean) => {
    if (Array.isArray(arg)) {
        if (arg.length === 0) {
            return ''
        }
        if (returnOne) {
            return `${cleanUrl(BASE_URL)}${cleanUrl(arg[0])}`
        }
        return arg.map((url) => `${cleanUrl(BASE_URL)}${cleanUrl(url)}`)
    }
    if (!arg) {
        return ''
    }
    return `${cleanUrl(BASE_URL)}${cleanUrl(arg)}`
}

export const deconstructImageUrl = (url: string) => {
    if (!url) {
        return ''
    }
    return url.replace(`${cleanUrl(BASE_URL)}`, '/')
}

const cleanUrl = (url: string) => {
    let cleanedUrl = url
    if (cleanedUrl.startsWith('/')) {
        cleanedUrl = cleanedUrl.slice(1)
    }
    if (!cleanedUrl.endsWith('/')) {
        cleanedUrl = `${cleanedUrl}/`
    }
    return cleanedUrl
}