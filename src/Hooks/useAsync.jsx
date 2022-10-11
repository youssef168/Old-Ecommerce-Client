import React, { useState, useCallback, useEffect } from 'react'

const useAsync = (callback, deps=[]) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState()
    const [error, setError] = useState()

    const callbackMemo = useCallback(() => {
        setData(null)
        setError(null)
        callback()
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }, deps)

    useEffect(() => {
        callbackMemo()
    }, [callbackMemo])
    
    return { loading, data, error }

}

export default useAsync