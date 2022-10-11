import React, { useState, useCallback } from 'react'


/**
 * A Hook That Used For Validate Email Address 
 * @param {String} email 
 * @returns 
 */
function useEmail(email) {
    const [emailState, setEmailState] = useState(email)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRegex = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;

    /**
     * Function Used To Handle Email Changes
     */
    const handleEmailChange = useCallback(e => {
        setEmailState(e.target.value)
    }, [setEmailState])

    /**
     * Function Used To Validate Email Address And Set Error Or Success Message, We Prefare Use It In On Submit Event
     */
    const handleEmail = useCallback(() => {
        if (emailRegex.test(emailState)) {
            setError('');
            setSuccess('Your Email Is Valid!');
        } else {
            setSuccess('');
            setError('Email is not valid!');
        }
    }, [emailState])
    
    return [emailState, handleEmailChange, handleEmail, error, success, setEmailState]
    
}

export default useEmail