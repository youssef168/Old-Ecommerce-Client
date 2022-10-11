import {
    ADD_SHIPPING_ADDRESS,
    ADD_CART_ITEMS,
    DELETE_CART_ITEMS,
    RESET_CART,
    SAVE_PAYMENT
} from '../Actions-types/CartTypes'

// Craete Reducer Contains Cart Items And Shipping Address

export const cartReducer = (state={cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ADD_CART_ITEMS:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x),
                }
            }
            else {
                return {
                    cartItems: [...state.cartItems, item]
                }
            }

        case DELETE_CART_ITEMS:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case RESET_CART:
            return {
                ...state,
                cartItems: []
            }

        case SAVE_PAYMENT:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case ADD_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }


        default:
            return state
    }
}