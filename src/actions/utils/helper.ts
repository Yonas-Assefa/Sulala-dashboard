type TGetPhoneNumber = {
    phone_number: FormDataEntryValue | string | null;
    country_code: FormDataEntryValue | string | null;
}
export const getPhoneNumber = ({ phone_number: raw_phone_number, country_code: raw_country_code }: TGetPhoneNumber) => {
    if (!raw_phone_number && !raw_country_code) return ''

    const phone_number = !raw_phone_number ? '' : (
        raw_phone_number?.toString()?.[0] == '0' ? raw_phone_number.slice(1) : raw_phone_number
    )
    const country_code = !raw_country_code ? '' : (
        raw_country_code?.toString()?.[0] == '+' ? raw_country_code : `+${raw_country_code}`
    )
    return `${country_code}${phone_number}`
}