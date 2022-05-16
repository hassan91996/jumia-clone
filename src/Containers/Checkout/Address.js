import Input from '../../Components/UI/FormElement/Input'
import useForm from "../../hooks/form-hooks"
import { setPersonInformation } from '../../store/actions/checkout'
import classes from './Address.module.css'
import { useDispatch } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




const Address = () => {
    const dispatch = useDispatch()
    const setInfo = (data) => dispatch(setPersonInformation(data))
    const [formState, inputHandler] = useForm({
        name: {
            value: "",
            isValid: false
        },
        phoneNumber: {
            value: "",
            isValid: false
        },
        address: {
            value: "",
            isValid: false
        },
        city: {
            value: "",
            isValid: false
        },
        Governorate: {
            value: "",
            isValid: false
        },
    },
        false)

    const onSubmitHamdler = async (e) => {
        e.preventDefault()
        const personData = {
            name: formState.inputs.name.value,
            address: formState.inputs.address.value,
            phoneNumber: formState.inputs.phoneNumber.value,
            city: formState.inputs.city.value,
            Governorate: formState.inputs.Governorate.value
        }
        setInfo(personData)
    }
    return (
        <div className={classes.PerosonInfo}>
            <div className={classes.header}>
                <CheckCircleIcon style={{ color: "#cdcdcd" }} />
                <p> المعلومات الشخصية</p>
            </div>
            <div className={classes.formContanier}>
                <form className={classes.form} onSubmit={onSubmitHamdler} >
                    <Input
                        elementType='input'
                        name="name"
                        validators={{ required: true }}
                        Errormassage={'هذا الحقل مطلوب'}
                        placeholder="الاسم"
                        onInput={inputHandler}
                        isvalid={formState.inputs.name.isValid}
                        initvalue={formState.inputs.name.value}
                    />
                    <Input
                        elementType='input'
                        name="phoneNumber"
                        validators={{ required: true }}
                        Errormassage={'هذا الحقل مطلوب'}
                        placeholder="رقم المويايل "
                        onInput={inputHandler}
                        isvalid={formState.inputs.phoneNumber.isValid}
                        initvalue={formState.inputs.phoneNumber.value}
                    />
                    <Input
                        elementType='input'
                        name="address"
                        validators={{ required: true }}
                        Errormassage={'هذا الحقل مطلوب'}
                        placeholder=" العنوان"
                        onInput={inputHandler}
                        isvalid={formState.inputs.address.isValid}
                        initvalue={formState.inputs.address.value}
                    />
                    <Input
                        elementType='input'
                        name="city"
                        validators={{ required: true }}
                        placeholder="المدينة "
                        Errormassage={'هذا الحقل مطلوب'}
                        onInput={inputHandler}
                        isvalid={formState.inputs.city.isValid}
                        initvalue={formState.inputs.city.value}
                    />
                    <Input
                        elementType='input'
                        name="Governorate"
                        validators={{ required: true }}
                        placeholder="المحافظة "
                        Errormassage={'هذا الحقل مطلوب'}
                        onInput={inputHandler}
                        isvalid={formState.inputs.Governorate.isValid}
                        initvalue={formState.inputs.Governorate.value}
                    />
                    <button type="submit" disabled={!formState.isValid}>استمرار</button>
                </form>
            </div>
        </div>
    )
}
export default Address
