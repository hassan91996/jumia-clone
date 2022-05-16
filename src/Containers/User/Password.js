import { useState } from 'react'
import axios from '../../axios'
import classes from './password.module.css'
import useForm from '../../hooks/form-hooks'
import Input from '../../Components/UI/FormElement/Input'
import ErrorLine from '../../Components/Errormodel/errorLine'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useHistory } from 'react-router-dom'

const AccountData = () => {
    const history = useHistory()
    const [formError, setformError] = useState()
    const [showPassword, setshowPassword] = useState(false)
    const [shownewPassword, setshownewPassword] = useState(false)


    const [formState, inputHandler] = useForm({
        oldPassword: {
            value: "",
            isValid: false
        },
        newPassword: {
            value: "",
            isValid: false
        },
    }, false)



    const updateuserData = async (e) => {
        e.preventDefault()
        const userData = {
            oldpassword: formState.inputs.oldPassword.value,
            newpassword: formState.inputs.newPassword.value
        }
        try {
            await axios.put('/users/changepassword', userData)
            history.push('/')
        } catch (error) {
            setformError(error.response.data)
        }
    }

    return (
        <div className={classes.changepassword}>
            <p> تغيير كلمة المرور</p>
            <form onSubmit={updateuserData}>
                {formError && <ErrorLine error={formError} />}
                <Input
                    elementType='input'
                    name="oldPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder=" كلمة المرور الحالية"
                    Errormassage={'يجب أن لا تقل كلمة المرور عن 8 حروف'}
                    validators={{ minLength: 8, required: true }}
                    onInput={inputHandler}
                    icon={showPassword ? <VisibilityOffIcon className={classes.icon} onClick={() => setshowPassword(false)} /> :
                        <VisibilityIcon className={classes.icon} onClick={() => setshowPassword(true)} />} />

                <Input
                    elementType='input'
                    name="newPassword"
                    Errormassage={'يجب أن لا تقل كلمة المرور عن 8 حروف'}
                    type={shownewPassword ? "text" : "password"}
                    placeholder="كلمة المرور الجديدة"
                    validators={{ minLength: 8, required: true }}
                    onInput={inputHandler}
                    icon={shownewPassword ? <VisibilityOffIcon className={classes.icon} onClick={() => setshownewPassword(false)} /> :
                        <VisibilityIcon className={classes.icon} onClick={() => setshownewPassword(true)} />} />
                <button type="submit" disabled={!formState.isValid}> حفظ</button>
            </form>
            {/* <MoonLoader color='orange' css={spinner} /> : */}

        </div>
    )
}

export default AccountData
