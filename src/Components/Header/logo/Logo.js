import React from 'react'
import logo from '../../../assets/Images/Logo.png'
import SmallLogo from '../../../assets/Images/SmallLogo.png'
import classes from './Logo.module.css'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link  className={classes.Logo} to={'/'}>
            <img src={logo} alt="logo" className={classes.desktop} />
            <img src={SmallLogo} alt="logo" className={classes.moblie} />
        </Link>

    )
}

export default Logo
