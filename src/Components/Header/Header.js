import { useState } from 'react'
import Logo from './logo/Logo'
import NavItemes from './navItems/NavItemes'
import classes from './Header.module.css'
import Burdermeun from './Burgermenu/Burdermeun'
import Search from './Search/search'
import SideDrawer from '../UI/SideDrawer/SideDrawer'
import LogoImg from '../../assets/Images/Logo.png';


const Header = (props) => {
    const [SideDrawervisible, setSideDrawervisible] = useState(false)
    const toggle = () => {
        setSideDrawervisible(!SideDrawervisible)
    }
    const close = () => {
        setSideDrawervisible(false)
    }
    return (
        <div className={classes.Header}>
            <div className={classes.container}>
                <Logo />
                <Search />
                <div className={classes.SmallDevices}>
                    <Burdermeun click={toggle} />
                    <SideDrawer Open={SideDrawervisible}
                        Header={<img src={LogoImg} alt="logo" />}
                        close={close}>
                        <NavItemes isAuth={props.isAuth} cartCount={props.cartCount} />
                    </SideDrawer>
                </div>
                <div className={classes.desktop}>
                    <NavItemes isAuth={props.isAuth} cartCount={props.cartCount} />
                </div>
            </div>
        </div>
    )
}

export default Header
