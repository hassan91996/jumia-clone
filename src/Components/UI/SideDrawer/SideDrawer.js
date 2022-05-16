import classes from './SideDrawer.module.css'
import Backdrop from '../Backdrop/Backdrop'
import ClearIcon from '@mui/icons-material/Clear';


const SideDrawer = (props) => {
    let BDclasses = props.Open ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close]
    return (
        <>
            <Backdrop show={props.Open} closeModel={props.close} />
            <div className={BDclasses.join(' ')}>
                <div className={classes.SideDrawerHeader}>
                    <ClearIcon onClick={props.close} className={classes.clear} />
                    {props.Header}
                </div>
                {props.children}
            </div>
        </>
    )
}

export default SideDrawer
