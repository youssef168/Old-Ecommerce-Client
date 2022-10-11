import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { getOrderByID, updateOrderToDelivered, updateOrderToPaid } from '../State/Actions/OrderActions'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import { ORDER_DELIEVER_RESET, ORDER_PAY_RESET } from '../State/Actions-types/OrderActions'
import Warning from '../Components/Warning'
import Navbar from '../Components/Navbar'
import { PayPalButton } from 'react-paypal-button-v2'

const OrderPage = () => {
    const orderDetails = useSelector(state => state.orderDetails);
    const delieverOrder = useSelector(state => state.delieverOrder);
    const orderPay = useSelector(state => state.orderPay);

    const { loading, order, error } = orderDetails
    const { loading: loadingPay, sucess: successPay, error: errorPay } = orderPay
    const { loading: loadingDeliver, success: successDeliver, error: errorDeliver } = delieverOrder
    

    const params = useParams();

    const dispatch = useDispatch();

    const [sdk, setSdk] = useState(false)

    const orderID = params._id;

    const addPayPalScriptToPage = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
        script.async = true
        script.onload = (() => {
            setSdk(true)
        })

        document.body.appendChild(script)
    }

    useEffect(() => {
        if (
          !order ||
          successPay ||
          successDeliver ||
          order._id !== Number(orderID)
        ) {
          dispatch({
            type: ORDER_DELIEVER_RESET
          })
          dispatch({
            type: ORDER_PAY_RESET
          })
          dispatch(getOrderByID(orderID))
        }

         else if (!order.is_paid) {
            if (!window.paypal) {
              addPayPalScriptToPage();
            } else {
              setSdk(true)
            }
        }

    }, [dispatch, orderID, order, successPay, successDeliver])

    useEffect(() => {
      console.log(order)
    }, [order])


    // Payment Handlers 
    const successHandler = useCallback((paymentResults) => {
      dispatch(updateOrderToPaid(orderID, paymentResults))
    }, [])

    const deliverHandler = useCallback(() => {
      dispatch(updateOrderToDelivered(order._id))
    }, [])
  return (
    <Fragment>
        {
          loading ? (
            <Loader />
          ) : error ? <Error alertMsg={error}/> : (
            <Fragment>
              <Navbar />
                <div className="container mt-5">
                  <div className="container-in">
                      <div className="right-side">
                          <div className="head-side">
                            <h2>Order: { order._id }</h2>
                          </div>
                          <div className="body-side">
                            <div className="side-pieces">
                                <div className="side-piece">
                                    <div className="head-piece">
                                        <h3>Shipping</h3>
                                    </div>
                                    <div className="body-piece">
                                      <h5>Name: {order.User.name}</h5>
                                      <h5>Email: {order.User.email}</h5>
                                      <h5>Shipping Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postal_code}</h5>
                                      <Warning wrnMsg="Not Delievred"/>
                                    </div>
                                </div>
                                <div className="side-piece bordered-y">
                                    <div className="head-piece">
                                      <h3>Payment</h3>
                                    </div>
                                    <div className="body-piece">
                                      <h5>Payment Method: {order.paymentMethod}</h5>
                                      <Warning wrnMsg="Not Paid"/>
                                    </div>
                                </div>
                                <div className="side-piece none-border">
                                    <div className="head-piece">
                                      <h3>Order Items</h3>
                                    </div>
                                    <div className="body-piece">
                                        {
                                          order.orderProducts.map(product => (
                                            <div className="item-piece" key={product._id}>
                                                <h3>{product.name}</h3>
                                                <h5>{product.qty} X ${product.price} = {order.total}</h5>
                                            </div>
                                          ))
                                        }
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>
                      <div className="left-side">
                        <div className="invoice-box">
                              <div className="inv-head">
                                  <h2>Order Invoice</h2>
                              </div>
                              <div className="inv-body">
                                  {/* <div className="inv-item">
                                      <h5>Items: ${}</h5>
                                  </div> */}
                                  <div className="inv-item">
                                      <h5>Shipping: ${order.shippingPrice}</h5>
                                  </div>
                                  <div className="inv-item">
                                      <h5>Tax: ${order.price}</h5>
                                  </div>
                                  <div className="inv-item">
                                      <h5>Total: ${order.total}</h5>
                                  </div>
                              </div>
                              <div className="inv-footer">
                                  {
                                    !order.is_paid && (
                                      <Fragment>
                                          {loadingPay && <Loader />}
                                          {!sdk ? (
                                            <Loader />
                                          ) : (
                                            <PayPalButton
                                              amount={order.totalPrice}
                                              onSuccess={successHandler}
                                            />
                                          )}
                                      </Fragment>
                                    )
                                  }
                              </div>
                        </div>
                      </div>
                  </div>
              </div>
            </Fragment>
          )
        }
    </Fragment>
  )
}

export default OrderPage