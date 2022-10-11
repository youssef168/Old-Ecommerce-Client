import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,  
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    TOP_PRODUCT_FAIL,
    TOP_PRODUCT_REQUEST,
    TOP_PRODUCT_SUCCESS,
    BEST_PRODUCT_FAIL,
    BEST_PRODUCT_REQUEST,
    BEST_PRODUCT_SUCCESS,
} from '../Actions-types/ProductTypes'
import axios from 'axios'

export const productListRequest = async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const { data } = await axios.get('http://localhost:8000/api/products/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const getSpecifiecProd = id => async (dispatch) => {
    try {
        console.log('asd')
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })

        const { data } = await axios.get(`http://localhost:8000/api/products/get/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const deleteProduct = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const {
            userSignin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`http://localhost:8000/api/products/delete/${id}/`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:8000/api/products/create/`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:8000/api/products/update/${product._id}/`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createProductReview = (Id, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:8000/api/products/review/${Id}/`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data 
                ? error.response.data.Error
                : error.message
        })
    }
}

export const topProduct = () => async (dispatch) => {
    try {
        dispatch({
            type: TOP_PRODUCT_REQUEST,
        })

        const { data } = await axios.get('http://localhost:8000/api/products/top/')

        dispatch({
            type: TOP_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TOP_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}


export const bestProduct = () => async (dispatch) => {
    try {
        dispatch({
            type: BEST_PRODUCT_REQUEST,
        })

        const { data } = await axios.get('http://localhost:8000/api/products/best/')

        dispatch({
            type: BEST_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BEST_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
        })
    }
}