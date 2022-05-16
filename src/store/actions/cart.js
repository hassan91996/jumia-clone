import axios from '../../axios';
import * as actionsTypes from './actionsTypes';


const fetchCartItemsStart = () => {return {type: actionsTypes.FETCH_CARTITEMS_STARTS}}

const fetchCartSuccess = (items) => {return {
        type: actionsTypes.FETCH_CARTITEMS_SUCCESS,
        items
    }}

const fetchCartFailed = (error) => {return {
        type: actionsTypes.FETCH_CARTITEMS_FAILED,
        error
    }}

export const fetchCartItems = () => {
    return async dispatch => { dispatch(fetchCartItemsStart())
        try {
            let res = await axios.get("/cart/find")
            dispatch(fetchCartSuccess(res.data.cartItems))
        }
        catch (error) {
            dispatch(fetchCartFailed(error))
        }
    }
}

const deleteItemStart = () => {return {type: actionsTypes.DELETE_CARTITEM_STARTS}}
const deleteItemSuccess = (items) => { return {
        type: actionsTypes.DELETE_CARTITEM__SUCCESS,
        items
    }}

const deleteItemFailed = (error) => {return {
        type: actionsTypes.DELETE_CARTITEM_FAILED,
        error
    }}

export const deletecartItem = (id,size) => {
    return async dispatch => {dispatch(deleteItemStart())
        try {
            let res = await axios.delete(`/cart/delete/${id}?size=${size}`)
            dispatch(deleteItemSuccess(res.data.cartItems))
        }
        catch (error) {
            dispatch(deleteItemFailed(error))
        }
    }
}

const reudceItemStart = () => {return {type: actionsTypes.REDUCE_CARTITEM_STARTS}}
const reudceItemSuccess = (items) => {
    return {
        type: actionsTypes.REDUCE_CARTITEM_SUCCESS,
        items
    }}

const reudceItemFailed = (error) => {
    return {
        type: actionsTypes.REDUCE_CARTITEMS_FAILED,
        error
    }}

export const reducecartItem = (id,size) => {
    return async dispatch => {dispatch(reudceItemStart())
        try {
            let res = await axios.delete(`/cart/reduce/${id}?size=${size}`)
            dispatch(reudceItemSuccess(res.data.cartItems))


        }
        catch (error) {
            dispatch(reudceItemFailed(error))

        }
    }
}

const addItemStart = () => {return {type: actionsTypes.ADD_CARTITEM_STARTS}}
const addItemSuccess = (items) => {
    return {
        type: actionsTypes.ADD_CARTITEM_SUCCESS,
        items
    }}

const addItemFailed = (error) => {
    return {
        type: actionsTypes.ADD_CARTITEM_FAILED,
        error
    }}


export const addcartItem = (id,size) => {
    return async dispatch => {dispatch(addItemStart())
        try {
            let res = await axios.post(`/cart/addtocart/${id}?size=${size}`)
            dispatch(addItemSuccess(res.data.cartItems))

        }
        catch (error) {
            dispatch(addItemFailed(error))
        }
    }
}

export const clearCart = () => {
    return {
        type: actionsTypes.CLEAR_CART_ITEMS,
    }}

