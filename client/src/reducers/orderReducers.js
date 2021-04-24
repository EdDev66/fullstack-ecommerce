import {
ORDER_CREATE_REQUEST,
ORDER_CREATE_SUCCESS,
ORDER_CREATE_FAIL,
ORDER_PLACEMENT_REQUEST,
ORDER_PLACEMENT_SUCCESS,
ORDER_PLACEMENT_FAIL,
ORDER_PAY_RESET,
ORDER_PAY_FAIL,
ORDER_PAY_SUCCESS,
ORDER_PAY_REQUEST,
ORDER_GET_REQUEST,
ORDER_GET_SUCCESS,
ORDER_GET_FAIL,
ORDER_RESET,
ORDER_GET_ALL_REQUEST,
ORDER_GET_ALL_SUCCESS,
ORDER_GET_ALL_FAIL,
ORDER_DELIVER_SUCCESS,
ORDER_DELIVER_REQUEST,
ORDER_DELIVER_FAIL,
ORDER_DELIVER_RESET
} from '../constants/orderContants';

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return { 
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case ORDER_PLACEMENT_REQUEST:
            return { 
                ...state,
                loading: true
            }
        case ORDER_PLACEMENT_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_PLACEMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return { 
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_DELIVER_REQUEST:
            return { 
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

export const orderGetReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case ORDER_GET_REQUEST:
            return { 
                loading: true
            }
        case ORDER_GET_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_GET_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case ORDER_GET_ALL_REQUEST:
            return { 
                loading: true
            }
        case ORDER_GET_ALL_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
