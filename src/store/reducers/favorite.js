import * as actions from '../actions/actionsTypes'


const intialsatete = {
    likedItems: null,
    error: null,
    loading: false
}

const fetchLikedStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const fetchLikedSuccess = (state, action) => {
    return {
        ...state,
        likedItems: action.items,
        loading: false,
        error: null
    }
}
const fetchLikedFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}


const addLikedStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const addLikedSuccess = (state, action) => {
    return {
        ...state,
        likedItems: action.items,
        loading: false,
        error: null
    }
}
const addLikedFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}


const clearLikedItems=(state,action)=>{
    return {
        ...state,
        likedItems:[]
    }
}




const favoriteReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.FETCH_LIKED_STARTS: return fetchLikedStart(state, action)
        case actions.FETCH_LIKED_SUCCESS: return fetchLikedSuccess(state, action)
        case actions.FETCH_LIKED_FAILED: return fetchLikedFailed(state, action)
        case actions.ADD_LIKED_STARTS: return addLikedStart(state, action)
        case actions.ADD_LIKED_SUCCESS: return addLikedSuccess(state, action)
        case actions.ADD_LIKED_FAILED: return addLikedFailed(state, action)
        case actions.CLEAR_LIKED_ITEMS: return clearLikedItems(state, action)

        default:
            return state
    }

}
export default favoriteReducer

