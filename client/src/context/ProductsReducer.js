 
import { SET_PRODUCTS, SET_DISPLAY_PRODUCTS, SET_LOADING, SET_CURRENT_PRODUCT } from './types';

export default (state, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }

        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.payload,
                loading: false
            }

        case SET_DISPLAY_PRODUCTS:
            return {
                ...state,
                displayProducts: action.payload
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}