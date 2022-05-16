import * as actionsTypes from './actionsTypes';


export const setPersonInformation = (personInfo) => {
    return {
        type: actionsTypes.SET_PERSON_INFORMATION,
        personInfo
    }
}
export const  setOrderPlace = (place) => {
    return {
        type: actionsTypes.SET_ORDER_PLACE,
        place    }
}
export const  setCost = (cost) => {
    return {
        type: actionsTypes.SET_DELEVERY_COST,
        cost    }
}
