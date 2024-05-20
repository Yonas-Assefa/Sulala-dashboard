export const billingMapper = async (data: any) => {
    if (Array.isArray(data)) {
        return data.map((billing: any) => {
            return {
                id: billing.id,
                holder_name: billing.account_holder_name,
                type: billing.type,
                primary: billing.is_default,
                card_number: billing.card_number,
                cvc: billing.cvc,
                expiry_date: billing.expiration_date,
            }
        })
    } else {
        return {
            holder_name: data.account_holder_name,
            type: data.type,
            primary: data.is_default,
            card_number: data.card_number,
            cvc: data.cvc,
            expiry_date: data.expiration_date,
        }
    }
}