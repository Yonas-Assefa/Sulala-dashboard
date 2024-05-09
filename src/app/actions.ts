'use server'

export const signIn = async (formData: FormData) => {
    console.log({ email: formData.get('email'), password: formData.get('password') })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({

            })
        })
    })
}