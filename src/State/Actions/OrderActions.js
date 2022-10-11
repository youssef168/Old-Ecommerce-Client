import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    LIST_ORDERS_REQUEST,
    LIST_ORDERS_SUCCESS,
    LIST_ORDER_FAIL,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_FAIL,
    ORDER_DELIEVER_REQUEST,
    ORDER_DELIEVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIEVER_RESET
} from '../Actions-types/OrderActions'

import { RESET_CART } from '../Actions-types/CartTypes'

import axios from 'axios'


// Create Order Action To Make New Orders
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        // Get User Data To Make Sure The User Is Logged In Then Send It To Server
        const { 
            userLogin: { userInfo }
         } = getState();

         console.log(userInfo)

         const Config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('http://localhost:8000/api/orders/create/', order, Config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
         
        dispatch({
            type: RESET_CART
        })

        // All In Cart Are Orders So There's No Need To Let Them!
        localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


// Get Specific Order By ID
export const getOrderByID = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        // Get User Data To Make Sure The User Is Logged In Then Send It To Server
        const { 
            userLogin: { userInfo }
        } = getState();

        const Config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }` // Token Remind Server Who The User Are Ordering
            }
        }

        const { data } = await axios.get(`http://localhost:8000/api/orders/get-order/${id}/`, Config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Update Order To Paid
export const updateOrderToPaid = (id, payment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        });

        // Get User Data To Make Sure The User Is Logged In Then Send It To Server
        const {
            userLogin: { userInfo }
        } = getState();

        const Config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.put(`http://localhost:8000/api/orders/update-order/${id}/`, payment, Config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// List All Orders For All Users In Admin Panel(For Admins Only)
export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_ORDERS_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState();

        const Config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }` // If This Token Wasn't Belong To Admin Won't Working
            }
        }

        const { data } = await axios.get('http://localhost:8000/api/orders/', Config);

        dispatch({
            type: LIST_ORDERS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: LIST_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Get User's Orders 
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_MY_ORDERS_REQUEST
        });

        const { 
            userLogin: { userInfo }
        } = getState()

        const Config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }` // To Remind Server Who The User Are Wanna Showing His Orders!
            }
        };

        const { data } = await axios.get('http://localhost:8000/api/orders/getmy-orders/', Config)

        dispatch({
            type: LIST_MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LIST_MY_ORDERS_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Update Order To Delivered Option
export const updateOrderToDelivered = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIEVER_REQUEST
        });

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`// To Remind Server Who The User Are Wanna Mark His Orders As Delivered 
            }
        }

        const { data } = await axios.put(`http://localhost:8000/api/orders/update-deliver/${order._id}/`, {}, config)

        dispatch({
            type: ORDER_DELIEVER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}