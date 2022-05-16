import * as actions from '../actions/actionsTypes';


const initalstate = {
    user: null,
    token: null,
    error: null,
    loading: false
}

const authstart = (state, action) => {
    return ({ ...state, loading: true, error: null })
}
const authfalied = (state, action) => {
    return ({
        ...state,
        error: action.error,
        loading: false
    })
}
const authsucess = (state, action) => {
    return ({
        ...state,
        user: action.user,
        token: action.token,
        error: null,
        loading: false
    })
}
const Logout = (state, action) => {
    return {...state,
        user: null,
        token: null,
        error: null,
        loading: false
    }
}

const reducer = (state = initalstate, action) => {
    switch (action.type) {
        case actions.AUTH_START: return authstart(state, action)
        case actions.AUTH_SUCCESS: return authsucess(state, action)
        case actions.AUTH_FAILED: return authfalied(state, action)
        case actions.LOGOUT: return Logout(state, action)
        default: return state
    }
}

export default reducer