import { useEffect } from "react";
import './App.css'
import Home from "./Containers/Home/Home";
import Auth from "./Containers/Auth/Auth";
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Layout from "./Components/Hoc/Layout";
import Category from './Containers/Category/Category'
import Product from './Containers/Product/Product'
import Cart from './Containers/Cart/Cart'
import Checkout from "./Containers/Checkout/Checkout";
import User from './Containers/User/User'
import Searchresultes from "./Containers/Searchresultes/Searchresultes";
import { fetchLikedItems, clearLiked, clearCart, fetchCartItems, authCheck, fechCategories } from './store/actions/index'
import Logout from './Containers/Auth/Logout'
import NotFound from './Containers/NotFound/NotFound'



function App() {

  const dispatch = useDispatch()
  const checkauth = () => dispatch(authCheck())
  const getCategories = () => dispatch(fechCategories());
  const getCartItem = () => dispatch(fetchCartItems())
  const clearcart = () => dispatch(clearCart())
  const getlikedProducts = () => dispatch(fetchLikedItems())
  const ClearLiked = () => dispatch(clearLiked())
  const IsAuth = useSelector(state => state.auth.token !== null)
  const Cartcount = useSelector(state => state.cart.totalcount)




  useEffect(() => {
    getCategories()
    checkauth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (IsAuth) {
      getCartItem()
      getlikedProducts()
    }
    else {
      clearcart()
      ClearLiked()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [IsAuth])

  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/products/:product" exact component={Product} />
      <Route path="/categories/:category" exact component={Category} />
      <Route path="/searchresultes" exact component={Searchresultes} />
      <Route path='*' component={NotFound} />
    </Switch>
  );
  if (IsAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/searchresultes" exact component={Searchresultes} />
        <Route path="/users/me" component={User} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/products/:product" exact component={Product} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/categories/:category" exact component={Category} />
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout isAuth={IsAuth} cartCount={Cartcount}>
        <Switch>
          {routes}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
