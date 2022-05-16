import * as actions from './actionsTypes';
import axios from '../../axios';

const authstart = () => {
    return {
        type: actions.AUTH_START
    }
}
const authsucess = (user, token) => {
    return {
        type: actions.AUTH_SUCCESS,
        user: user,
        token: token
    }
}
const authfaild = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error: error
    }
}

export const Logout = () => {
    localStorage.clear();
    return {
        type: actions.LOGOUT
    }
}
const checkTimeout = (exp) => {
    return dispatch => setTimeout(() => {
        dispatch(Logout)
    }, exp * 1000);
}

export const auth = (userData, isSingup) => {
    return async (dispatch) => {
        dispatch(authstart());
        try {
            const res = isSingup ? (await axios.post('users/singup', userData)).data :
                (await axios.post('users/login', userData)).data;
            const expirationDate = new Date(new Date().getTime() + res.expirIn * 1000)
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))
            localStorage.setItem('expireDate', expirationDate)
            dispatch(authsucess(res.user, res.token))
            dispatch(checkTimeout(res.expirIn))
        } catch (e) {
            dispatch(authfaild(e.response.data))
        }
    }
}

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(Logout());
        } else {
            const expiredate = new Date(localStorage.getItem('expireDate'))
            if (new Date() >= expiredate) {
                dispatch(Logout());
            }
            else {
                const user = localStorage.getItem("user")
                dispatch(authsucess(user, token))
                dispatch(checkTimeout(((expiredate.getTime() - new Date().getTime()) / 1000)))
            }
        }
    }
}