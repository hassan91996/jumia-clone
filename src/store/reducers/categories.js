import * as actions from '../actions/actionsTypes'


const intialsatete = {
    categories: null,
    error: null,
    loading: false
}

const fetchCategriesStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}
const fetchCategriesSuccess = (state, action) => {
    return {
        ...state,
        categories: action.categories,
        loading: false,
        error: null
    }
}
const fetchCategriesFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}




const categoriesReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.FETCH_CATEGORIES_STARTS: return fetchCategriesStart(state, action)
        case actions.FETCH_CATEGORIES_SUCCESS: return fetchCategriesSuccess(state, action)
        case actions.FETCH_CATEGORIES_FAILED: return fetchCategriesFailed(state, action)
        default:
            return state
    }

}
export default categoriesReducer

