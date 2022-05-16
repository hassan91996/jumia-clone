import axios from '../../axios';
import * as actionsTypes from './actionsTypes';

const fetchProductsStart = () => {
    return {
        type: actionsTypes.FETCH_PRODUCTS_STARTS
    }
}
const fetchProductsSuccess = (data) => {
    return {
        type: actionsTypes.FETCH_PRODUCTS_SUCCESS,
        productsData: data,
       
    }
}
const fetchProductsFailed = (error) => {
    return {
        type: actionsTypes.FETCH_PRODUCTS_FAILED,
        error: error
    }
}
export const fetchProducts = (params) => {
    return async dispatch => {
        dispatch(fetchProductsStart())
        try {
            let res = await axios.get("/products/category",{
                params:{...params}
            })
            dispatch(fetchProductsSuccess(res.data))
        }
        catch (error) {
            dispatch(fetchProductsFailed(error))
        }
    }

}