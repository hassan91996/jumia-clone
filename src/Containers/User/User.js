import { useState } from 'react'
import classes from './User.module.css'
import { NavLink, Route, Switch } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountData from './AccountData'
import Orders from './Orders'
import Rating from './Rating'
import Favorites from './Favorites'
import Password from './Password'
import NotFound from '../NotFound/NotFound';
import SideDrawer from '../../Components/UI/SideDrawer/SideDrawer'
const User = (props) => {
    const [SideDrawervisible, setSideDrawervisible] = useState(false)

    const Links = <div className={classes.Links}>
        <ul>
            <li> <NavLink to={props.match.path + '/'} exact activeClassName={classes.active} ><PersonOutlineIcon className={classes.Icon} /> حسابي</NavLink></li>
            <li> <NavLink to={props.match.path + '/orders'} exact activeClassName={classes.active} ><ShoppingBagOutlinedIcon className={classes.Icon} />الطلبات</NavLink></li>
            <li> <NavLink to={props.match.path + '/favorites'} exact activeClassName={classes.active} ><FavoriteBorderOutlinedIcon className={classes.Icon} />المنتجات المحفوظة</NavLink></li>
            <li> <NavLink to={props.match.path + '/rating'} exact activeClassName={classes.active} ><NoteAltOutlinedIcon className={classes.Icon} />التقييمات والتعليقات</NavLink></li>
            <li> <NavLink to={props.match.path + '/password'} exact activeClassName={classes.active} ><LockOutlinedIcon className={classes.Icon} />تغيير كلمة السر</NavLink></li>
        </ul>
    </div>
    return (
        <div className={classes.userPage}>
            <div className={classes.userDesktop}>
                {Links}
            </div>
            <div className={classes.ResUser}>
                <div className={classes.userIcon} onClick={() => setSideDrawervisible(true)}>
                    <PersonOutlineIcon className={classes.Icon} />
                </div>
                <SideDrawer Open={SideDrawervisible}
                    close={() => setSideDrawervisible(false)}>
                    {Links}
                </SideDrawer>

            </div>
            <div className={classes.RoutesArea} >
                <Switch>
                    <Route path={props.match.path + '/'} exact component={AccountData} />
                    <Route path={props.match.path + '/orders'} exact component={Orders} />
                    <Route path={props.match.path + '/rating'} exact component={Rating} />
                    <Route path={props.match.path + '/favorites'} exact component={Favorites} />
                    <Route path={props.match.path + '/password'} exact component={Password} />
                    <Route path='*' exact component={NotFound} />
                </Switch>

            </div>
        </div>

    )
}

export default User
