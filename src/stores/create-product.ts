import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type ProductState = {
  title: string;
  quantity: string;
  description: string;
  price: string;
  discount: string;
  status: string;
  category: string;
  animals: string[];
  brands: string[];
  tags: string[];
};

export type ProductActions = {
  setTitle: (title: string) => void;
  setQuantity: (quantity: string) => void;
  setDescription: (description: string) => void;
  setPrice: (price: string) => void;
  setDiscount: (discount: string) => void;
  setStatus: (status: string) => void;
  setCategory: (category: string) => void;
  setAnimals: (animals: []) => void;
  setBrands: (brands: []) => void;
  setTags: (tags: []) => void;
};

export type ProductStore = ProductState & ProductActions;

export const initPromotionStore = (): ProductState => {
  return {
    title: "",
    quantity: "",
    description: "",
    price: "",
    discount: "",
    status: "",
    category: "",
    animals: [],
    brands: [],
    tags: [],
  };
};

export const defaultInitState: ProductState = {
  title: "",
  quantity: "",
  description: "",
  price: "",
  discount: "",
  status: "",
  category: "",
  animals: [],
  brands: [],
  tags: [],
};

export const createPromotionStore = (
  initState: ProductState = defaultInitState,
) => {
  return createStore<ProductStore>()(
    persist(
      (set) => ({
        ...initState,
        setTitle: (title: string) => set({ title }),
        setQuantity: (quantity: string) => set({ quantity }),
        setDescription: (description: string) => set({ description }),
        setPrice: (price: string) => set({ price }),
        setDiscount: (discount: string) => set({ discount }),
        setStatus: (status: string) => set({ status }),
        setCategory: (category: string) => set({ category }),
        setAnimals: (animals: []) => set({ animals }),
        setBrands: (brands: []) => set({ brands }),
        setTags: (tags: []) => set({ tags }),
      }),
      {
        name: "create-product",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
