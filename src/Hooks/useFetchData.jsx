import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAsync from './useAsync'
const OPTIONS = {
    headers: {
        'Content-Type': 'application/json'
    },
}

function useFetchData(url, options={}, deps=[]) {
    return useAsync(() => {
        return fetch(url, {...OPTIONS, ...options}).then((res) => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
    }, deps)
}

export default useFetchData