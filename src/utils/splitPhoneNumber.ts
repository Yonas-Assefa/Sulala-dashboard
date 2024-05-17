import parsePhoneNumberFromString from "libphonenumber-js";

export function splitPhoneNumber(phoneNumber: string | undefined) {
    if (!phoneNumber) return {
        countryPhoneCode: '',
        phoneNumber: ''
    };
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);

    if (!parsedNumber) {
        throw new Error('Invalid phone number');
    }

    const countryPhoneCode = parsedNumber.countryCallingCode;
    const nationalNumber = parsedNumber.nationalNumber;

    return {
        countryPhoneCode: `+${countryPhoneCode}`,
        phoneNumber: nationalNumber
    };
}