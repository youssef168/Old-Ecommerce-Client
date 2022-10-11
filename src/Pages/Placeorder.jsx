import React, { Fragment, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../State/Actions/OrderActions'
import { RESET_CART } from '../State/Actions-types/CartTypes'
import { useNavigate } from 'react-router-dom'
import BlackBtn from '../Components/BlackButton'
import { CREATE_ORDER_RESET } from '../State/Actions-types/OrderActions'



const Placeorder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Extract Data From Selectors
    const cart = useSelector(state => state.cart)
    const orderItem = useSelector(state => state.createOrder);

    const cartItems = cart.cartItems;
    const { order, success, error } = orderItem

    const items = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);

    const shipping = items >= 200 ? 0 : 10;

    const tax = Number(0.082 * items).toFixed(2)

    const total = (Number(items) + Number(shipping) + Number(tax)).toFixed(2);

    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))

    const handleCreateOrder = () => {
        dispatch(createOrder({
            payment_method: paymentMethod,
            price: total,
            shippingPrice: shipping,
            shippingAddress: cart.shippingAddress,
            price: tax,
            total: total,
            order_products: cartItems
        }))
        // console.log('asdasd')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({
                type: CREATE_ORDER_RESET
            })
        }
    }, [success])
  return (
    <Fragment>
        <Navbar />
        <div className="container mt-5">
            <div className="container-in">
                <div className="right-side">
                    <div className="order-details">
                        <div className="i-detail">
                            <h3>Shipping</h3>
                            <h5>Shipping Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</h5>
                        </div>
                        <div className="i-detail">
                            <h3>Payment</h3>
                            <h5>Payment Method: {paymentMethod}</h5>
                        </div>
                        <div className="i-detail">
                            <h3>Items</h3>
                            {
                                cartItems.length > 0 ? (
                                    <div className="item-container">
                                        {
                                            cartItems.map((item) => (
                                                <div className="item-body" key={item.product}>
                                                    <div className="item-img">
                                                        <img src={`http://localhost:8000${item.img}`} alt="" />
                                                    </div>
                                                    <div className="title">
                                                        <h3>{item.name}</h3>
                                                    </div>
                                                    <div className="invoice">
                                                        <h5>{item.qty} X {item.price} = {Number(item.qty * item.price)}</h5>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : <h5>No Items Founded</h5>
                            }
                        </div>
                    </div>
                </div>
                <div className="left-side">
                    <div className="invoice-box">
                        <div className="inv-head">
                            <h2>Order Invoice</h2>
                        </div>
                        <div className="inv-body">
                            <div className="inv-item">
                                <h5>Items: ${items}</h5>
                            </div>
                            <div className="inv-item">
                                <h5>Shipping: ${shipping}</h5>
                            </div>
                            <div className="inv-item">
                                <h5>Tax: ${tax}</h5>
                            </div>
                            <div className="inv-item">
                                <h5>Total: ${total}</h5>
                            </div>
                        </div>
                        <div className="inv-footer">
                            <BlackBtn text="Place Order" onClick={ () => handleCreateOrder() }/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Placeorder