import React, { Fragment, useCallback, useEffect, useState } from 'react'
import BlackBtn from '../Components/BlackButton'
import Navbar from '../Components/Navbar'
import Warning from '../Components/Warning'
import { useDispatch } from 'react-redux'
import { addPaymentMethod } from '../State/Actions/CartActions' 
import { useNavigate } from 'react-router-dom'

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(paymentMethod)
    }, [paymentMethod])

    const handlePaymentRouting = useCallback(() => {
        dispatch(addPaymentMethod(paymentMethod))

        navigate('/placeorder')
    })
  return (
    <Fragment>
        <Navbar />
        <div className="special-container container">
            <div className="head-i">
                <h3>Payment Option</h3>
                <Warning wrnMsg="Don't Worry For This, If You Choose The Wrong Option You Can Change It In a Placeholder" />
            </div>
            <div className="payment-opts">
                <div className="radio-group">
                    <label htmlFor="PayPal">PayPal</label>
                    <input type="radio" id="PayPal" name='Payment' value="PayPal" onChange={e => setPaymentMethod(e.target.value)}/>
                </div>
                <div className="radio-group">
                    <label htmlFor="Credit-Card">Credit-Card</label>
                    <input type="radio" id='Credit-Card' name='Payment' value="Credit-Card" onChange={e => setPaymentMethod(e.target.value)}/>
                </div>
            </div>
            <BlackBtn text="Continue" onClick={handlePaymentRouting}/>
        </div>
    </Fragment>
  )
}

export default Payment