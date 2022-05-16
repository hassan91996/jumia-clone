import axios from '../../axios';
import * as actionsTypes from './actionsTypes';


const fetchHomeDataStart = () => {return {type: actionsTypes.FETCH_HOMEDATA_STARTS}}

const fetchHomeDataSuccess = (data) => {return {
        type: actionsTypes.FETCH_HOMEDATA_SUCCESS,
        data
    }}

const fetchHomeDataFailed = (error) => {return {
        type: actionsTypes.FETCH_HOMEDATA_FAILED,
        error
    }}

export const fetchHomeData = () => {
    return async dispatch => { dispatch(fetchHomeDataStart())
        try {
            let res = await axios.get('products/homegroups')
            dispatch(fetchHomeDataSuccess(res.data))
        }
        catch (error) {
            dispatch(fetchHomeDataFailed(error))
        }
    }
}

