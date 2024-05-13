const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const signup = (data: { email: string, phone_number: string }) => {
    console.log({ message: 'sign up is called' })
    return fetch(`${BASE_URL}vendors/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}