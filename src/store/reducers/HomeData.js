import * as actions from '../actions/actionsTypes'


const intialsatete = {
    HomeData: null,
    error: null,
    loading: false
}

const fetchHomedataStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const fetchHomeDataSuccess = (state, action) => {
    return {
        ...state,
        HomeData: action.data,
        loading: false,
        error: null
    }
}
const fetchHomeDataFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}






const HomeReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.FETCH_HOMEDATA_STARTS: return fetchHomedataStart(state, action)
        case actions.FETCH_HOMEDATA_SUCCESS: return fetchHomeDataSuccess(state, action)
        case actions.FETCH_HOMEDATA_FAILED: return fetchHomeDataFailed(state, action)

        default:
            return state
    }

}
export default HomeReducer

