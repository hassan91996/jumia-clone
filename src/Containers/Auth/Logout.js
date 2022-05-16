import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logout } from '../../store/actions/index'


const Logingout = () => {
    const dispatch = useDispatch()
    const logingout = () => dispatch(Logout());
    useEffect(() => {
        logingout();
    })
    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}

export default Logingout
