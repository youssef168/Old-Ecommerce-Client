import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    LIST_ORDERS_REQUEST,
    LIST_ORDERS_SUCCESS,
    LIST_ORDER_FAIL,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_FAIL,
    LIST_MY_ORDERS_RESET,
    ORDER_DELIEVER_REQUEST,
    ORDER_DELIEVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIEVER_RESET
} from '../Actions-types/OrderActions'


// export const CreateOrderReducer = (state={}, action) => {
//     switch (action.type) {
//         case CREATE_ORDER_REQUEST:
//           return {
//             loading: true,
//           };
    
//         case CREATE_ORDER_SUCCESS:
//           return {
//             loading: false,
//             success: true,
//             order: action.payload,
//           };
    
//         case CREATE_ORDER_FAIL:
//           return {
//             loading: false,
//             error: action.payload,
//           };
    
//         case CREATE_ORDER_RESET:
//           return {};
    
//         default:
//           return state;
    
//     }
// }

// export const OrderDetailsReducer = (state={loading: true,orderItems: [], shippingAddress: {}}, action) => {
//     switch (action.type) {
//         case ORDER_DETAILS_REQUEST:
//           return {
//             ...state,
//             loading: true,
//           };
    
//         case ORDER_DETAILS_SUCCESS:
//           return {
//             loading: false,
//             order: action.payload,
//           };
    
//         case ORDER_DETAILS_FAIL:
//           return {
//             loading: false,
//             error: action.payload,
//           };
    
//         default:
//           return state;
//       }
// }

export const CreateOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          loading: true,
        };
  
      case CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload,
        };
  
      case CREATE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CREATE_ORDER_RESET:
        return {};
  
      default:
        return state;
    }
  };
  
  /* REDUCER USED IN PlaceOrder COMPONENT TO STORE ORDER DETAILS */
  export const OrderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
  ) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };

export const OrderPayReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

// Shows Only For Admins
export const ListOrdersReducer = (state={ orders: [] }, action) => {
    switch (action.type) {
        case LIST_ORDERS_REQUEST:
            return {
                loading: true,
            }

        case LIST_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        
        case LIST_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}


export const ListMyOrdersReducer = (state={ orders: [] }, action) => {
    switch (action.type) {
        case LIST_MY_ORDERS_REQUEST:
            return {
                loading: true,
            }

        case LIST_MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case LIST_MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case LIST_MY_ORDERS_RESET:
            return {};

        default:
            return state
    }
}

export const DelieverOrderReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_DELIEVER_REQUEST:
            return {
                loading: true,
            }

        case ORDER_DELIEVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DELIEVER_RESET:
            return {};

        default:
            return state;
    }
}

