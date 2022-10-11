import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    loginReducer,
    registerReducer,
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
    
} from './Reducers/UserReducer'

import {
    productReducer,
    productCreateReducer,
    productCreateReviewReducer,
    productDeleteReducer,
    productDetailsReducer,
    productUpdateReducer,
    topProductReducer,
    bestProductReducer,
} from './Reducers/ProductReducer'

import { 
    CreateOrderReducer,
    OrderDetailsReducer,
    OrderPayReducer,
    ListOrdersReducer,
    ListMyOrdersReducer,
    DelieverOrderReducer
 } from '../State/Reducers/OrderReducer'

import { cartReducer } from './Reducers/CartReducer'

const reducers = combineReducers({
    cart: cartReducer,

    userLogin: loginReducer,
    userRegister: registerReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    usreList: userListReducer,
    userUpdateProf: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    products: productReducer,
    productCreate: productCreateReducer,
    productsReviews: productCreateReviewReducer,
    productsDelete: productDeleteReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    topProducts: topProductReducer,
    bestProducts: bestProductReducer,

    createOrder: CreateOrderReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: OrderPayReducer,
    listOrders: ListOrdersReducer,
    listMyOrders: ListMyOrdersReducer,
    delieverOrder: DelieverOrderReducer,
})

const userState = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initState = {

    cart: {
        cartItems: cartItems,
        shippingAddress: shippingAddress
    },

    userLogin: {
        userInfo: userState
    }
}

const middleWare = [thunk]

const store = createStore(reducers, initState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store