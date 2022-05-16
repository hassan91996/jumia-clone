import axios from '../../axios';
import * as actionsTypes from './actionsTypes';

import{categories}from '../../shared/lineaCategoriest'

const fetchCategriesStart = () => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_STARTS
    }
}
const fetchCategriesSuccess = (categories) => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories
    }
}
const fetchCategriesFailed = (error) => {
    return {
        type: actionsTypes.FETCH_CATEGORIES_FAILED,
        error: error
    }
}
export const fechCategories = () => {
    return async dispatch => {
        dispatch(fetchCategriesStart())
        try {
            let res = await axios.get("/categories")
            dispatch(fetchCategriesSuccess(categories(res.data.categoryList)))
        }
        catch (error) {
            dispatch(fetchCategriesFailed(error))
        }
    }

}