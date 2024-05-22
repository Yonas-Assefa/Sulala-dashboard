import { createStore } from 'zustand/vanilla'

export type SetupState = {
    first_name: string
    last_name: string
    email: string
    campany_name: string
    sales_category: string
    address: string
    stage: 'one' | 'two' | 'three'
}

export type SetupActions = {
    nextStage: () => void
    previousStage: () => void
    setFirstName: (first_name: string) => void
    setLastName: (last_name: string) => void
    setEmail: (email: string) => void
    setSalesCategory: (sales_category: string) => void
    setAddress: (address: string) => void
    setCompanyName: (campany_name: string) => void
}

export type SetupStore = SetupState & SetupActions

export const initSetupStore = (): SetupState => {
    return {
        address: '',
        campany_name: '',
        email: '',
        first_name: '',
        last_name: '',
        sales_category: '',
        stage: 'one'
    }
}

export const defaultInitState: SetupState = {
    address: '',
    campany_name: '',
    email: '',
    first_name: '',
    last_name: '',
    sales_category: '',
    stage: 'one'
}

export const createSetupStore = (
    initState: SetupState = defaultInitState,
) => {
    return createStore<SetupStore>()((set) => ({
        ...initState,
        nextStage: () => set((state) => {
            if (state.stage === 'one') {
                return { stage: 'two' }
            }
            if (state.stage === 'two') {
                return { stage: 'three' }
            }
            return state
        }),
        previousStage: () => set((state) => {
            if (state.stage === 'three') {
                return { ...state, stage: 'two' }
            }
            if (state.stage === 'two') {
                return { ...state, stage: 'one' }
            }
            return state
        }),
        setFirstName: (first_name: string) => set({ first_name }),
        setLastName: (last_name: string) => set({ last_name }),
        setEmail: (email: string) => set({ email }),
        setSalesCategory: (sales_category: string) => set({ sales_category }),
        setAddress: (address: string) => set({ address }),
        setCompanyName: (campany_name: string) => set({ campany_name }),
    }))
}