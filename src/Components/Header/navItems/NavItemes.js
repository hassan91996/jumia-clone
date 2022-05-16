import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavItemes.module.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@material-ui/core'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const NavItemes = (props) => {

    return (
        <ul className={classes.NavItemes}>
            {props.isAuth ? <>
                <li><NavLink to="/users/me/" exact activeClassName={classes.active}>
                    حسابي <PersonOutlineOutlinedIcon className={classes.Icon} /></NavLink></li>
                <li><NavLink to="/cart" exact activeClassName={classes.active}> عربة التسوق
                    <Badge badgeContent={props.cartCount} color="primary" >
                        <ShoppingCartOutlinedIcon className={classes.Icon} />
                    </Badge>
                </NavLink>
                </li>
                <li><NavLink to="/logout" exact activeClassName={classes.active}>تسجيل الخروج <LogoutIcon className={classes.Icon} /> </NavLink></li>
            </>:
             <li><NavLink to="/auth" activeClassName={classes.active}> تسجيل الدخول  <PersonOutlineOutlinedIcon /></NavLink></li>
            }

           

        </ul>
    )
}

export default NavItemes
