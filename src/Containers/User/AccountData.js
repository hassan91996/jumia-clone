import { useState, useEffect } from 'react'
import axios from '../../axios'
import classes from './AccountData.module.css'
import useForm from '../../hooks/form-hooks'
import Input from '../../Components/UI/FormElement/Input'
import EditIcon from '@mui/icons-material/Edit';
import { useAxios } from '../../hooks/Http-hook'
import Spinner from '../../Components/Spinner/Spinner'
import ErrorModal from '../../Components/Errormodel/ErrorModal'
import ErrorLine from '../../Components/Errormodel/errorLine'
const AccountData = () => {
    const [user, setuser] = useState()
    const [edit, setEdit] = useState(false)
    const [formError, setformError] = useState()


    const { error, loading, response, fetchData } = useAxios()
    const [formState, inputHandler, setFormData] = useForm({
        username: {
            value: "",
            isValid: false
        },
        email: {
            value: "",
            isValid: false
        },
    }, false)

    useEffect(() => {
        fetchData('/users/me', 'get')
        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (response) {
            setuser(response.user)
        }
    }, [error, loading, response])


    useEffect(() => {
        if (user)
            setFormData({
                username: {
                    value: user.username,
                    isValid: true
                },
                email: {
                    value: user.email,
                    isValid: true
                },
            }, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit])

    const updateuserData = async (e) => {
        e.preventDefault()
        const userData = {
            username: formState.inputs.username.value,
            email: formState.inputs.email.value
        }
        try {
            let res = (await axios.put(`users/updateuser/${user._id}`, userData)).data
            setuser(res.newuser)
            setformError()
            setEdit(false)

        } catch (error) {
            setformError(error.response.data)
        }
    }



    return (
        <div className={classes.AccountData}>

            <p>{edit ? "?????????? ???????????? ????????????" : "???????? ???????? ?????? ????????????"}</p>
            {edit ?

                <form onSubmit={updateuserData}>
                    {formError && <ErrorLine error={formError} />}
                    <Input
                        elementType='input'
                        Errormassage={'?????? ???? ???? ?????? ?????????? ???? 3 ????????'}
                        name="username"
                        validators={{ required: true, minLength: 3 }}
                        placeholder="?????? ????????????????"
                        onInput={inputHandler}
                        initvalue={user.username}
                        isvalid={true}
                        lable="?????? ????????????????"
                    />
                    <Input
                        elementType='input'
                        name="email"
                        placeholder="???????????? ????????????????????"
                        onInput={inputHandler}
                        initvalue={user.email}
                        validators={{ isEmail: true, required: true }}
                        isvalid={true}
                        lable="???????????? ????????????????????"
                        Errormassage={'???????? ???????????????? ?????? ????????'}


                    />
                    <button type="submit" disabled={!formState.isValid}> ??????</button>
                </form>

                : loading ? <Spinner /> :
                    error ? <ErrorModal Reload={() => fetchData('/users/me', 'get')} /> :
                        <div className={classes.accountInfo}>
                            <div className={classes.Infoheader}>
                                <p>???????????? ????????????</p>
                                <button onClick={() => setEdit(true)}>
                                    <EditIcon />
                                </button>
                            </div>
                            {user && <div className={classes.Infocontainer}>
                                <p>{user.username}</p>
                                <p>{user.email}</p>
                            </div>}
                        </div>}
        </div>
    )
}

export default AccountData
