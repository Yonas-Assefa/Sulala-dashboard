export const changeLocaleToISO = (val: unknown) => {
    if (isLocalString(val)) {
        return (new Date(val as string)).toISOString()
    }
}

const isLocalString = (val: unknown): boolean => {
    return /^\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{1,2}:\d{1,2} (AM)|(PM)$/.test(val as string)
}
