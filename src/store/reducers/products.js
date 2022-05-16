import * as actions from '../actions/actionsTypes'


const intialsatete = {
    products: null,
    colors: null,
    brands: null,
    count: 0,
    max:0,
    min:0,
    rate:null,
    offer:null,
    sizes:null,
    error: null,
    loading: false,
}

const fetchProductsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}
const fetchProductsSuccess = (state, action) => {
    return {
        ...state,
        products: action.productsData.products,
        colors: action.productsData.colors,
        brands: action.productsData.Brands,
        count: action.productsData.count,
        max: action.productsData.minmaxprice.max,
        min: action.productsData.minmaxprice.min,
        rate: action.productsData.maxrate.max,
        offer: action.productsData.maxoffer.max,
        sizes: action.productsData.sizes,
        loading: false,
        error: null
    }
}
const fetchProductsFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}




const ProductsReducer = (state = intialsatete, action) => {
    switch (action.type) {
        case actions.FETCH_PRODUCTS_STARTS: return fetchProductsStart(state, action)
        case actions.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action)
        case actions.FETCH_PRODUCTS_FAILED: return fetchProductsFailed(state, action)
        default:
            return state
    }

}
export default ProductsReducer

