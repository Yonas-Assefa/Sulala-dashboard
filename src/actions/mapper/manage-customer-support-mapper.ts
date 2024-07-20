type TManageCustomerSupport = {
  id: number;
  full_name: string;
  email: string;
  message: string;
  answered: boolean;
  status: string;
};

export const manageCustomerSupport = async (
  // data: TManageCustomerSupport[] | TManageCustomerSupport,
  data: any,
) => {
  function convert(item: any) {
    if (!item) return {};
    return {
      id: item.id,
      full_name: item.full_name,
      email: item.email,
      message: item.question,
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
