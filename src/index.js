import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import categoriesReducer from './store/reducers/categories';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import checkoutReducer from './store/reducers/checkout'
import likedReducer from './store/reducers/favorite'
import homeReducer from './store/reducers/HomeData'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products:productsReducer,
  auth:authReducer,
  cart:cartReducer,
  checkout:checkoutReducer,
  liked:likedReducer,
  home:homeReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);




