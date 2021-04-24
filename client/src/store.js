import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import { 
productListReducer, 
singleProductReducer, 
productDeleteReducer, 
productCreateReducer,
productUpdateReducer
 } from './reducers/productReducers';
import { 
userLoginReducer, 
userRegisterReducer, 
userDetailsReducer, 
updateProfileReducer, 
userListReducer,
userDeleteReducer,
userUpdateReducer
 } from './reducers/userReducers';

import { 
orderCreateReducer, 
orderDetailsReducer, 
orderPayReducer, 
orderGetReducer, 
orderListReducer, 
orderDeliverReducer
} from './reducers/orderReducers';

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
     },
    userLogin: { userInfo: userFromStorage }
}

const reducer = combineReducers({
    productList: productListReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    updateProfile: updateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderGet: orderGetReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
});

const middleware = [thunk];

const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;