import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import classes from './Auth.module.css'
import Input from '../../Components/UI/FormElement/Input'
import useForm from '../../hooks/form-hooks';
import { auth } from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FadeLoader } from 'react-spinners'
import ErrorLine from '../../Components/Errormodel/errorLine'

const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const Auth = (data, sing) => dispatch(auth(data, sing))
    const IsAuth = useSelector(state => state.auth.token !== null)
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)
    const [isSingup, setisSingup] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchHandler = () => {
        if (!isSingup) {
            setFormData(
                {
                    ...formState.inputs,
                    firsname: undefined,
                    lastname: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    firsname: {
                        value: '',
                        isValid: false
                    },
                    lastname: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setisSingup(!isSingup);
    }

    const submitForm = (e) => {
        e.preventDefault()
        let userData
        if (isSingup) {
            userData = {
                username: [formState.inputs.firstname.value, formState.inputs.lastname.value].join(' '),
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            }

        }
        else {
            userData = {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            }
        }
        Auth(userData, isSingup)

    }
    const spinner = `  margin : 10px auto `
    return (
        <div className={classes.Auth}>
            {IsAuth && <Link to={() => history.goBack()} />}
            <div className={classes.formContanier}>
                <div className={classes.IconContainer}>
                    <LockIcon style={{ fontSize: '40px' }} />
                </div>
                <p>{!isSingup ? "تسجيل الدخول" : "إنشاء حساب"}</p>
                {error && <ErrorLine error={error} />}
                <form onSubmit={submitForm} className={classes.form}>
                    {isSingup && <Input
                        elementType='input'
                        name="firstname"
                        type="text"
                        Errormassage={'يجب أن لا يقل الإسم عن 3 حروف'}
                        placeholder="الاسم الاول"
                        FormFactor={isSingup}
                        validators={{ required: true, minLength: 2 }}
                        onInput={inputHandler} />}
                    {isSingup && <Input
                        elementType='input'
                        name="lastname"
                        type="text"
                        placeholder="اسم العائلة"
                        FormFactor={isSingup}
                        onInput={inputHandler} />}
                    <Input
                        elementType='input'
                        name="email"
                        type="email"
                        FormFactor={isSingup}
                        Errormassage={'بريد الكتروني غير صالح'}
                        placeholder="البريد الإلكتروني"
                        validators={{ isEmail: true, required: true }}
                        onInput={inputHandler} />
                    <Input
                        elementType='input'
                        name="password"
                        FormFactor={isSingup}
                        type={showPassword ? "text" : "password"}
                        Errormassage={'يجب أن لا تقل كلمة المرور عن 8 حروف'}
                        placeholder="كلمة السر "
                        validators={{ minLength: 8, required: true }}
                        onInput={inputHandler}
                        icon={showPassword ? <VisibilityOffIcon className={classes.icon} onClick={() => setshowPassword(false)} /> : <VisibilityIcon className={classes.icon} onClick={() => setshowPassword(true)} />} />
                    {loading ? <FadeLoader height={10} color="orange" margin={-5} css={spinner} /> : <button disabled={!formState.isValid} > {!isSingup ? "تسجيل الدخول" : "إنشاء حساب"}</button>}
                </form>
                <span className={classes.footerspan}>{isSingup ? "بالفعل لدي حساب" : "  ألا تملك حساب ؟"} <button onClick={switchHandler}>{isSingup ? "تسجيل الدخول" : "إنشاء حساب"}</button></span>
            </div>

        </div>
    )
}

export default Auth