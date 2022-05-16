import Radio from '../../Components/UI/FormElement/radiobuttom/Radio'
import classes from './payment.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Payment = (props) => {

    return (
        <div className={classes.paymentInfo} >
            <div className={classes.header}>
                <CheckCircleIcon style={{ color:props.checked?"#a3cf62":"#cdcdcd" }} />
                <p>اختيار طريقة الدفع</p>
            </div>
            <div className={classes.paymentForm}>
            <Radio checked={props.checked} element="paypal" name="payment" handlechange={props.handlechange} display="paypal"/>
            <Radio checked={props.checked} element="meza" name="payment" handlechange={props.handlechange} display='meza'/>
            <Radio checked={props.checked} element="عند وصول الطلب" name="payment" handlechange={props.handlechange}  display="عند وصول الطلب"/>
            </div>
        </div>
    )
}

export default Payment
