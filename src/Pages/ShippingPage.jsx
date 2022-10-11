import React, { Fragment, useCallback, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { addShippingAddress } from '../State/Actions/CartActions'
import { useNavigate } from 'react-router-dom'
import BlackBtn from '../Components/BlackButton'

const ShippingPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate()

    const shippingAddress = cart.shippingAddress

    const [country, setCountry] = useState(shippingAddress.country)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [address, setAddress] = useState(shippingAddress.address)




    const handleShippings = useCallback((e) => {
        e.preventDefault();

        dispatch(addShippingAddress({
            address: address,
            city: city,
            postalCode: postalCode,
            country: country,
        }));

        navigate('/payment')

    }, [country, city, postalCode, address])

  return (
    <Fragment>
        <Navbar />
        <div className="mt-5 container">
            <div className="inner-content">
                <div className="h-content">
                    <h2>Shipping Address</h2>
                    <h4>After Saving This Address Will Be Used In Every Order You'll Do!</h4>
                </div>
                <div className="b-content">
                    <form method='POST'>
                        <div className="form-group">
                            <h5 className="label">Address</h5>
                            <input type="text" value={ address ? address : '' } onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <h5 className='label'>City</h5>
                            <input type="text" value={ city ? city : '' } onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <h5 className='label'>Postal Code</h5>
                            <input type="text" value={ postalCode ? postalCode : '' } onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <h5 className='label'>Country</h5>
                            <input type="text" value={ country ? country : '' } onChange={(e) => setCountry(e.target.value)} />
                        </div>

                        {/* <button onClick={(e) => handleShippings(e)}>Continue</button> */}
                        <BlackBtn text="Continue" onClick={(e) => handleShippings(e)}/>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ShippingPage