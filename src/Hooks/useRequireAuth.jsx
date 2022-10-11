import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function useRequireAuth() {
    const user = localStorage.getItem('userInfo')
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            console.log('asd')
        } else {
            console.log('asdasd')
             navigate('/signup')
        }
    }, [user])
}

export default useRequireAuth