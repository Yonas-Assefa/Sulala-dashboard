import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type SetupState = {
  campaign_name: string;
  items: string[];
  description: string;
  start_date_time: string;
  end_date_time: string;
  destination_type: string;
  shop: string;
  budget: string;
  budgeting: string;
  promotion_discount_type: string;
  discount: string;
  limited_price: string;
  cart_total: string;
};

export type SetupActions = {
  setCampaignName: (campaign_name: string) => void;
  setItems: (items: string[]) => void;
  setDescription: (description: string) => void;
  setStartDateTime: (start_date_time: string) => void;
  setEndDateTime: (end_date_time: string) => void;
  setDestinationType: (destination_type: string) => void;
  setShop: (shop: string) => void;
  setBudget: (budget: string) => void;
  setBudgeting: (budgeting: string) => void;
  setPromotionDiscountType: (promotion_discount_type: string) => void;
  setDiscount: (discount: string) => void;
  setLimitedPrice: (limited_price: string) => void;
  setCartTotal: (cart_total: string) => void;
  resetStore: () => void;
};

export type SetupStore = SetupState & SetupActions;

export const initSetupStore = (): SetupState => {
  return {
    campaign_name: "",
    items: [],
    description: "",
    start_date_time: "",
    end_date_time: "",
    destination_type: "",
    shop: "",
    budget: "",
    budgeting: "",
    promotion_discount_type: "",
    discount: "",
    limited_price: "",
    cart_total: "",
  };
};

export const defaultInitState: SetupState = {
  campaign_name: "",
  items: [],
  description: "",
  start_date_time: "",
  end_date_time: "",
  destination_type: "",
  shop: "",
  budget: "",
  budgeting: "",
  promotion_discount_type: "",
  discount: "",
  limited_price: "",
  cart_total: "",
};

export const createPromotionStore = (
  initState: SetupState = defaultInitState,
) => {
  return createStore<SetupStore>()(
    persist(
      (set) => ({
        ...initState,
        setCampaignName: (campaign_name: string) => set({ campaign_name }),
        setItems: (items: string[]) => set({ items }),
        setDescription: (description: string) => set({ description }),
        setStartDateTime: (start_date_time: string) => set({ start_date_time }),
        setEndDateTime: (end_date_time: string) => set({ end_date_time }),
        setDestinationType: (destination_type: string) =>
          set({ destination_type }),
        setShop: (shop: string) => set({ shop }),
        setBudget: (budget: string) => set({ budget }),
        setBudgeting: (budgeting: string) => set({ budgeting }),
        setPromotionDiscountType: (promotion_discount_type: string) =>
          set({ promotion_discount_type }),
        setDiscount: (discount: string) => set({ discount }),
        setLimitedPrice: (limited_price: string) => set({ limited_price }),
        setCartTotal: (cart_total: string) => set({ cart_total }),
        resetStore: () => set(defaultInitState),
      }),
      {
        name: "create-promotion",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
