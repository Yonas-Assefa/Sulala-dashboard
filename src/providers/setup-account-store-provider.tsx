// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore, create } from 'zustand'
import { persist } from "zustand/middleware";

import {
    type SetupStore,
    createSetupStore,
    initSetupStore,
} from '@/stores/setup-account'

export const CounterStoreContext = createContext<StoreApi<SetupStore> | null>(
    null,
)

export interface CounterStoreProviderProps {
    children: ReactNode
}

export const CounterStoreProvider = ({
    children,
}: CounterStoreProviderProps) => {
    const storeRef = useRef<StoreApi<SetupStore>>()
    if (!storeRef.current) {
        storeRef.current = createSetupStore(initSetupStore())
    }

    return (
        <CounterStoreContext.Provider value={storeRef.current}>
            {children}
        </CounterStoreContext.Provider>
    )
}

export const useCounterStore = <T,>(
    selector: (store: SetupStore) => T,
): T => {
    const counterStoreContext = useContext(CounterStoreContext)

    if (!counterStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(counterStoreContext, selector)
}