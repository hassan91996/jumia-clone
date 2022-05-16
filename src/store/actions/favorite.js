import axios from '../../axios';
import * as actionsTypes from './actionsTypes';


const fetchLikedStart = () => {return {type: actionsTypes.FETCH_LIKED_STARTS}}

const fetchLikedSuccess = (items) => {return {
        type: actionsTypes.FETCH_LIKED_SUCCESS,
        items
    }}

const fetchLikedFailed = (error) => {return {
        type: actionsTypes.FETCH_LIKED_FAILED,
        error
    }}

export const fetchLikedItems = () => {
    return async dispatch => { dispatch(fetchLikedStart())
        try {
            let res = await axios.get("/users/me/liked")
            dispatch(fetchLikedSuccess(res.data.likedproducts))
        }
        catch (error) {
            dispatch(fetchLikedFailed(error))
        }
    }
}




const addLikedStart = () => {return {type: actionsTypes.ADD_LIKED_STARTS}}
const addLikedSuccess = (items) => {
    return {
        type: actionsTypes.ADD_LIKED_SUCCESS,
        items
    }}

const addLikedFailed = (error) => {
    return {
        type: actionsTypes.ADD_LIKED_FAILED,
        error
    }}


export const addLikedItem = (id) => {
    return async dispatch => {dispatch(addLikedStart())
        try {
            let res = await axios.post(`/users/likeproduct/${id}`)
            dispatch(addLikedSuccess(res.data.likedproducts))

        }
        catch (error) {
            dispatch(addLikedFailed(error))
        }
    }
}

export const clearLiked = () => {
    return {
        type: actionsTypes.CLEAR_LIKED_ITEMS,
    }}

