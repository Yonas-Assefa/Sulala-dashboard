export const manageCustomerSupport = async (data: any) => {
  function convert(item: any) {
    if (!item) return {};
    return {
      id: item.id,
      full_name: item.full_name,
      email: item.email,
      message: item.message,
      status: item.answered ? "answered" : "pending",
    };
  }
  if (Array.isArray(data)) {
    return data.map((shop: any) => {
      return convert(shop);
    });
  } else {
    return convert(data);
  }
};
