import classes from './Cart.module.css'
import { useSelector } from 'react-redux'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckoutElement from '../../Components/Checkoutelement/CheckoutElement';
import { Link } from 'react-router-dom';


const Cart = () => {

    const Cart = useSelector(state => state.cart.cartItems)
    const totalQantity = useSelector(state => state.cart.totalcount)
    const totalPrice = useSelector(state => state.cart.totalprice)


    return (
        <div>
            {
                Cart && Cart.length > 0 ?
                    <div className={classes.Cart} >
                        <h1> عربة التسوق({totalQantity} منتجات) </h1>
                        <div className={classes.CartProducts}>
                            <div className={classes.CartTable}>
                                < div className={classes.header} >
                                    <span style={{ width: "470px", textAlign: "right" }}> المنتج </span>
                                    <span style={{ width: "150px" }} > ا لكمية</span>
                                    <span style={{ width: "130px" }} > سعر الوحدة </span>
                                    <span style={{ width: "150px" }}> إجمالي المبلغ </span>
                                </div>
                                <div className={classes.Products}>
                                    {Cart.map((prod, i) => <CheckoutElement product={prod} key={i} />)}
                                </div>
                            </div>
                            <div className={classes.summery}><p> اجمالي الطلب </p>
                                <div>
                                    <p> المبلغ الكلي: </p>
                                    <span> {totalPrice.toFixed(2)} ج.م </span>
                                </div>
                                <Link to="/checkout" style={{ color: "white", backgroundColor: "#ffa500" }}> متابعة الشراء </Link>
                                <Link to="/" style={{ color: "#ffa500", backgroundColor: "white" }}> الرجوع للموقع </Link>
                            </div>
                        </div>
                    </div > :
                    <div className={classes.noCart}><ShoppingCartOutlinedIcon style={{ fontSize: '100px', color: "#ededed" }} />
                        <h4 > عربة التسوق فارغة </h4>
                        < Link to="/"> تسوق </Link> </div >
            }
        </div>
    )
}

export default Cart