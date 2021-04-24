import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
  } from '../constants/productConstants';


  export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST })

            const res = await axios.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);

            dispatch({ 
                type: PRODUCT_LIST_SUCCESS, 
                payload: res.data 
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
  }

  export const listSingleProduct = (id) => async (dispatch) => {
      try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST })

        const res = await axios.get(`/products/${id}`)

        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: res.data
        })

      } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload: error.response
        })
      }
  }

  export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

       const res = await axios.post(`/products`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config =  {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

       const res = await axios.put(`/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.message
        })
    }
}