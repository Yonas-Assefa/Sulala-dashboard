import { BASE_URL } from "@/config/urls"

export const constructImageUrl = (arg: string | string[], returnOne: boolean) => {
    if (Array.isArray(arg)) {
        if (arg.length === 0) {
            return ''
        }
        if (returnOne) {
            return finalImageCleanup(`${cleanUrl(BASE_URL)}${cleanUrl(arg[0])}`)
        }
        return arg.map((url) => finalImageCleanup(`${cleanUrl(BASE_URL)}${cleanUrl(url)}`))
    }
    if (!arg) {
        return ''
    }
    return finalImageCleanup(`${cleanUrl(BASE_URL)}${cleanUrl(arg)}`)
}

export const deconstructImageUrl = (url: string | string[]): string => {
    if (!url) {
        return ''
    }
    if (Array.isArray(url)) {
        return deconstructImageUrl(url[0])
    }
    return url.replace(`${cleanUrl(BASE_URL)}`, '/')
}

const cleanUrl = (url: string, end?: boolean) => {
    let cleanedUrl = url
    if (cleanedUrl.startsWith('/')) {
        cleanedUrl = cleanedUrl.slice(1)
    }
    if (!cleanedUrl.endsWith('/')) {
        cleanedUrl = `${cleanedUrl}/`
    }
    return cleanedUrl
}

const finalImageCleanup = (url: string) => {
    const uid = `?uid=${new Date().getTime()}`
    if (url.endsWith('/')) {
        return url.slice(0, url.length - 1) + uid
    }
    return url + uid
}