type TBilling = {
  id: number;
  account_holder_name: string;
  type: string;
  is_default: boolean;
  card_number: string;
  cvc: string;
  expiration_date: string;
};

// export const billingMapper = async (data: TBilling[] | TBilling) => {
export const billingMapper = async (data: any) => {
  function convert(item: any) {
    return {
      id: item.id,
      holder_name: item.account_holder_name,
      type: item.type,
      primary: item.is_default,
      card_number: item.card_number,
      cvc: item.cvc,
      expiry_date: item.expiration_date,
    };
  }
  if (Array.isArray(data)) {
    return data
      .map((billing: any) => {
        return convert(billing);
      })
      .sort((billing) => (billing.primary ? -1 : 1));
  } else {
    return convert(data);
  }
};
