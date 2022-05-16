import React from 'react'
import Radio from '../../Components/UI/FormElement/radiobuttom/Radio'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setOrderPlace, setCost } from '../../store/actions/checkout'
import classes from './orderplace.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Orderplace = () => {
    const dispatch = useDispatch()
    const setorderplace = (data) => dispatch(setOrderPlace(data))
    const setcost = (data) => dispatch(setCost(data))
    const [place, setPlace] = useState()

    const handlechange = (e, cost) => {
        setPlace(e.target.value)
        setcost(cost)
    }
    const Places = [
        { element: "تسليم إلى باب منزلك", cost: 50 },
        { element: "محطة استلام الطلب", cost: 0 }
    ]

    const handleClick = () => {
        setorderplace(place)
    }
    return (
        <div className={classes.orderplaceInfo} >
            <div className={classes.header}>
                <CheckCircleIcon style={{ color: "#cdcdcd" }} />
                <p>مكان التوصيل</p>
            </div>
            <div className={classes.orderplaceForm}>
                {Places.map((pl, i) =>
                    <Radio key={i} checked={place} element={pl.element} name="orderPlace" handlechange={(e) => handlechange(e, pl.cost)} display={pl.element} />

                )}
                <button disabled={!place} onClick={handleClick}> استمرار</button>
            </div>
        </div>
    )
}

export default Orderplace
