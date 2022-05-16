import React, { useState, useEffect } from 'react'
import { useAxios } from '../../hooks/Http-hook'
import classes from './Orders.module.css'
import Order from '../../Components/Order/Order'
import ErrorModal from '../../Components/Errormodel/ErrorModal'
import Spinner from '../../Components/Spinner/Spinner'

const Orders = () => {

    const [closed, setclosed] = useState(false)
    const [oOrders, setoOrders] = useState([])
    const [cOrders, setcOrders] = useState([])




    const { loading, error, response, fetchData } = useAxios()

    useEffect(() => {
        fetchData('/orders/me', "get")
        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (response) {
            let open = [], close = []
            for (const order of response.orders) {
                if (order.isDelivered === false) {
                    open.push(order)
                }
                else {
                    close.push(order)
                }
            }
            setoOrders([...open])
            setcOrders([...close])
        }
    }, [response]);
    return (
        <div className={classes.Userorders}>
            <p>الطلبات</p>
            {loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData('/orders/me', "get")} /> :
                    <>
                        <div className={classes.ordersHeader}>
                            <span onClick={() => setclosed(false)} className={!closed ? classes.active : ""}>الطلبات الحالية  ({oOrders.length})</span>
                            <span onClick={() => setclosed(true)} className={closed ? classes.active : ""}>  الطلبات المغلقة ({cOrders.length})</span>
                        </div>
                        <div className={classes.allorders}>
                            {
                                closed ? cOrders.map((order, i) => <Order key={i} order={order} />) :
                                    oOrders.map((order, i) => <Order key={i} order={order} />)
                            }
                        </div></>
            }
        </div>
    )
}

export default Orders
