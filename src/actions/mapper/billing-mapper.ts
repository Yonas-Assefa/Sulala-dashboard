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
    return data.map((billing: any) => {
      return convert(billing);
    });
  } else {
    return convert(data);
  }
};
