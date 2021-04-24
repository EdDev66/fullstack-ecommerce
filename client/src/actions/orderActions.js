import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_PLACEMENT_FAIL,
    ORDER_PLACEMENT_SUCCESS,
    ORDER_PLACEMENT_REQUEST,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_FAIL,
    ORDER_GET_ALL_SUCCESS,
    ORDER_GET_ALL_FAIL,
    ORDER_GET_ALL_REQUEST,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
} from '../constants/orderContants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.post(`/order`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_PLACEMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/order/${id}`, config)

        dispatch({
            type: ORDER_PLACEMENT_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PLACEMENT_FAIL,
            payload: error.message
        })
    }
}


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.put(`/order/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.put(`/order/${order._id}/deliver`, {}, config)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_GET_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/order/myorders`, config)

        dispatch({
            type: ORDER_GET_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ORDER_GET_FAIL,
            payload: error.message
        })
    }
}

export const getAllOrders = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_GET_ALL_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/order/`, config)

        dispatch({
            type: ORDER_GET_ALL_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: ORDER_GET_ALL_FAIL,
            payload: error.message
        })
    }
}