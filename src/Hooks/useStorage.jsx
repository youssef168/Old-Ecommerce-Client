import React, { useEffect, useState, useCallback } from 'react'

export const useLocalStorage = (key, value) => {
    return useStorage(key, value, localStorage)
}

export const useSessionStorage = (key, value) => {
    return useSessionStorage(key, value, sessionStorage)
}

const useStorage = (key, value, storageType) => {
    const [store, setStore] = useState(() => {
        const storeValue = storageType.getItem(key)
        if (storeValue && storeValue !== null && storeValue !== undefined) return JSON.parse(storeValue)

        if (typeof value  === 'function') {
            return value()
        } else {
            return value
        }
    })
    
    useEffect(() => {
        if (store === undefined || store === null) return storageType.removeItem(key)
        return storageType.setItem(key, JSON.stringify(store))
    }, [key, store, storageType])

    const clearStore = useCallback(() => {
        setStore([])
    }, [])

    return [store, setStore, clearStore]

}
