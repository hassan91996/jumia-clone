import * as actions from '../actions/actionsTypes'


const intialsatete = {
  personInfo:null,
  orderplace:null,
  cost:0

}

const checkoutReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.SET_ORDER_PLACE: return {...state,orderplace:action.place}
        case actions.SET_PERSON_INFORMATION: return {...state,personInfo:action.personInfo}
        case actions.SET_DELEVERY_COST: return {...state,cost:action.cost}
        default:
            return state
    }

}
export default checkoutReducer

