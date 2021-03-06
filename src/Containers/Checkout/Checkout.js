import { useEffect, useState } from 'react'
import classes from './Checkout.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Address from './Address'
import Payment from './payment'
import Orderplace from './orderplace'
import Img from '../../Components/UI/Image';
import ErrorModal from '../../Components/Errormodel/ErrorModal';
import { Route, useHistory, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { setOrderPlace, setPersonInformation, setCost } from '../../store/actions/checkout'
import { clearCart } from '../../store/actions/index'
import { useAxios } from '../../hooks/Http-hook';
import { FadeLoader } from 'react-spinners';

const spinner = `
margin : 10px auto`
const Ckeckout = (props) => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const Cart = useSelector(state => state.cart.cartItems)
    const totalQantity = useSelector(state => state.cart.totalcount)
    const totalPrice = useSelector(state => state.cart.totalprice)
    const personInfo = useSelector(state => state.checkout.personInfo)
    const orderplace = useSelector(state => state.checkout.orderplace)
    const deleveryCost = useSelector(state => state.checkout.cost)

    const clearcart = () => dispatch(clearCart())
    const setorderplace = (data) => dispatch(setOrderPlace(data))
    const setpersonInfo = (data) => dispatch(setPersonInformation(data))
    const setcost = (data) => dispatch(setCost(data))
    const [payment, setpayment] = useState()


    const { fetchData, loading, error, response } = useAxios()


    useEffect(() => {
        if (totalQantity === 0) {
            history.push('/')
        }
        else {
            if (!personInfo) {
                history.push('/checkout/address')
            } else if (personInfo && !orderplace) {
                history.push('/checkout/orderplace')
            } else if (personInfo && orderplace) {
                history.push('/checkout/payment')
            }
        }

    }, [personInfo, orderplace,totalQantity,history])

    useEffect(() => {
        if (response) {
            clearcart()
            setcost(0)
            setpersonInfo()
            setorderplace()

            return () => {
                history.push('/')
            }
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);


    const submitHandler = () => {
        const orderItems = []
        for (const prod of Cart) {
            orderItems.push({
                product: prod._id,
                price: prod.currentPrice?prod.currentPrice:prod.price,
                quantity: prod.quantity,
                size: prod.size

            })
        }
        const CustomerInfo = {
            name: personInfo.name,
            address: personInfo.address,
            city: personInfo.city,
            Governorate: personInfo.Governorate,
            phoneNumber: personInfo.phoneNumber
        }
        const orderData = {
            orderItems,
            CustomerInfo,
            paymentMethod: payment,
            itemsPrice: totalPrice,
            deliveryPrice: deleveryCost,
            totalPrice: totalPrice + deleveryCost
        }
        fetchData('/orders/addorder', 'post', orderData)
    }


    const handlepayment = (e) => {
        setpayment(e.target.value)
    }
    const addresschange = () => {
        setpersonInfo()
        setorderplace()
        setpayment()
    }
    const orderplacechange = () => {
        setorderplace()
        setpayment()

    }
    return (
        <div>
            <div className={classes.Checkout}>
                <div className={classes.CheckoutContent}>
                    <div className={classes.header}>
                        {location.pathname !== "/checkout/address" && personInfo && <div className={classes.Infocontent}>
                            <div className={classes.activeTitle}>
                                <div className={classes.title}>
                                    <CheckCircleIcon style={{ color: "#a3cf62" }} />
                                    <p>?????????????????? ??????????????</p>
                                </div>
                                <button onClick={addresschange}> ????????</button>
                            </div>
                            <p>{personInfo.name}</p>
                            <p>{personInfo.address} ,{personInfo.city},{personInfo.Governorate}</p>
                            <p>{personInfo.phoneNumber}</p>
                        </div>}
                        {orderplace && <div className={classes.Infocontent}>
                            <div className={classes.activeTitle}>
                                <div className={classes.title}>
                                    <CheckCircleIcon style={{ color: "#a3cf62" }} />
                                    <p>???????? ??????????????</p>
                                </div>
                                <button onClick={orderplacechange}> ????????</button>
                            </div>
                            <p>{orderplace}</p>
                        </div>}
                    </div>
                    <Route path={props.match.path + '/address'} component={Address} />
                    <Route path={props.match.path + '/orderplace'} component={Orderplace} />
                    <Route path={props.match.path + '/payment'} component={() => <Payment checked={payment} handlechange={handlepayment} />} />
                    {location.pathname === "/checkout/payment" && <div className={classes.orderButton}>
                        <div><span>???????????? ????????????</span> <span >{totalPrice.toFixed(2)} ??.??</span></div>
                        {deleveryCost > 0 && <div><span>???????????? ??????????</span> <span style={{ fontWeight: "600" }}>{deleveryCost.toFixed(2)} ??.??</span></div>}
                        <div><span>???????????? ??????????</span> <span style={{ color: "orange", fontSize: "18px" }}>{(totalPrice + deleveryCost).toFixed(2)} ??.??</span></div>
                        {loading ? <FadeLoader height={10} color="orange" margin={-5} css={spinner} /> :
                            error ? <ErrorModal Reload={submitHandler} />
                                : <button disabled={!payment} onClick={submitHandler}>
                                    ?????????? ??????????
                                </button>}
                    </div>}
                    {!personInfo && <div >
                        <div className={classes.title}>
                            <CheckCircleIcon style={{ color: "#cdcdcd" }} />
                            <p>???????? ??????????????</p>
                        </div>
                    </div>}
                    {!orderplace && <div  >
                        <div className={classes.title}>
                            <CheckCircleIcon style={{ color: "#cdcdcd" }} />
                            <p>?????????? ??????????</p>
                        </div>
                    </div>}
                </div>
                <div className={classes.summery}>
                    <p>????????({totalQantity} ????????????)</p>
                    <div className={classes.summeryProducts}>
                        {Cart && Cart.map((item, i) => <div className={classes.product} key={i}>
                            <Img src={`${item.image.url}`} alt="PordImage" />
                            <div>
                                <p>{item.name}</p>
                                <p style={{ color: "orange" }}>{item.currentPrice?item.currentPrice:item.price} ??.?? </p>
                                <p> ???????????? : <b>{item.quantity} </b></p>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className={classes.orderButton}>
                        <div><span>???????????? ????????????</span> <span >{totalPrice.toFixed(2)}  ??.??</span></div>
                        {deleveryCost > 0 && < div ><span>???????????? ??????????</span> <span >{deleveryCost.toFixed(2)}  ??.??</span></div>}
                        <div><span>???????????? ??????????</span> <span style={{ color: "orange", fontSize: "18px" }}>{(totalPrice + deleveryCost).toFixed(2)} ??.??</span></div>
                    </div>
                    <Link to="/cart">???????? ?????? ???????? ????????????</Link>
                </div>
            </div>

        </div >

    )
}

export default Ckeckout



