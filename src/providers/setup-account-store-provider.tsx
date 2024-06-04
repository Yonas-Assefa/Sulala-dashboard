'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore, create } from 'zustand'
import { persist } from "zustand/middleware";

import {
    type SetupStore,
    createSetupStore,
    initSetupStore,
} from '@/stores/setup-account'

export const SetupAccountStoreContext = createContext<StoreApi<SetupStore> | null>(
    null,
)

export interface SetupAccountStoreProviderProps {
    children: ReactNode
}

export const SetupAccountStoreProvider = ({
    children,
}: SetupAccountStoreProviderProps) => {
    const storeRef = useRef<StoreApi<SetupStore>>()
    if (!storeRef.current) {
        storeRef.current = createSetupStore(initSetupStore())
    }

    return (
        <SetupAccountStoreContext.Provider value={storeRef.current}>
            {children}
        </SetupAccountStoreContext.Provider>
    )
}

export const useSetupAccountStore = <T,>(
    selector: (store: SetupStore) => T,
): T => {
    const setupAccountStoreContext = useContext(SetupAccountStoreContext)

    if (!setupAccountStoreContext) {
        throw new Error(`useSetupAccountStore must be use within SetupAccountStoreProvider`)
    }

    return useStore(setupAccountStoreContext, selector)
}