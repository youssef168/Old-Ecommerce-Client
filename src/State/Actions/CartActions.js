import axios from 'axios'

import {
    ADD_SHIPPING_ADDRESS,
    ADD_CART_ITEMS,
    DELETE_CART_ITEMS,
    RESET_CART,
    SAVE_PAYMENT
} from '../Actions-types/CartTypes'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:8000/api/products/get/${id}/`)
    
    dispatch({
        type: ADD_CART_ITEMS,
        payload: {
            product: data._id,
            name: data.product_name,
            img: data.product_img,
            price: data.price,
            stock: data.stockCounter,
            qty
        }
    })
    console.log('REQUESTED SUCCESSFULY')
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const deleteItem = (id) => async (dispatch, getState) => {
    dispatch({
        type: DELETE_CART_ITEMS,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: ADD_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
}

export const addPaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}