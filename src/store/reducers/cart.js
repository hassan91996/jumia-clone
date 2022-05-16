import * as actions from '../actions/actionsTypes'

const intialsatete = {
    cartItems: null,
    totalcount:0,
    totalprice:0,
    error: null,
    loading: false
}

const fetchCartStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const fetchCartSuccess = (state, action) => {
    return {
        ...state,
        cartItems: action.items,
        totalcount:action.items.reduce((a, c) => a + c.quantity, 0),
        totalprice:action.items.reduce((a, c) => a + (c.quantity *(c.currentPrice?c.currentPrice:c.price) ), 0),
        loading: false,
        error: null
    }
}
const fetchCartFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}
const deleteItemStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const deleteItemSuccess = (state, action) => {
    return {
        ...state,
        cartItems: action.items,
        totalcount:action.items.reduce((a, c) => a + c.quantity, 0),
        totalprice:action.items.reduce((a, c) => a + (c.quantity *(c.currentPrice?c.currentPrice:c.price) ), 0),
        loading: false,
        error: null
    }
}
const deleteItemFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}
const addItemStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const addItemSuccess = (state, action) => {
    return {
        ...state,
        cartItems: action.items,
        totalcount:action.items.reduce((a, c) => a + c.quantity, 0),
        totalprice:action.items.reduce((a, c) => a + (c.quantity *(c.currentPrice?c.currentPrice:c.price) ), 0),
        loading: false,
        error: null
    }
}
const addItemFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}
const reduceItemStart = (state, action) => {return {
        ...state,
        loading: true,
        error: null
    }
}
const reduceItemSuccess = (state, action) => {
    return {
        ...state,
        cartItems: action.items,
        totalcount:action.items.reduce((a, c) => a + c.quantity, 0),
        totalprice:action.items.reduce((a, c) => a + (c.quantity *(c.currentPrice?c.currentPrice:c.price) ), 0),
        loading: false,
        error: null
    }
}
const reduceItemFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const clearCartItems=(state,action)=>{
    return {
        ...state,
        cartItems:[],
        totalcount:0,
        totalprice:0
    }
}




const cartReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.FETCH_CARTITEMS_STARTS: return fetchCartStart(state, action)
        case actions.FETCH_CARTITEMS_SUCCESS: return fetchCartSuccess(state, action)
        case actions.FETCH_CARTITEMS_FAILED: return fetchCartFailed(state, action)
        case actions.DELETE_CARTITEM_STARTS: return deleteItemStart(state, action)
        case actions.DELETE_CARTITEM__SUCCESS: return deleteItemSuccess(state, action)
        case actions.DELETE_CARTITEM_FAILED: return deleteItemFailed(state, action)
        case actions.ADD_CARTITEM_STARTS: return addItemStart(state, action)
        case actions.ADD_CARTITEM_SUCCESS: return addItemSuccess(state, action)
        case actions.ADD_CARTITEM_FAILED: return addItemFailed(state, action)
        case actions.REDUCE_CARTITEM_STARTS: return reduceItemStart(state, action)
        case actions.REDUCE_CARTITEM_SUCCESS: return reduceItemSuccess(state, action)
        case actions.REDUCE_CARTITEMS_FAILED: return reduceItemFailed(state, action)
        case actions.CLEAR_CART_ITEMS: return clearCartItems(state, action)

        default:
            return state
    }

}
export default cartReducer

