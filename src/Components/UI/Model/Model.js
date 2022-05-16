import React from 'react'
import classes from './Model.module.css';
import BackDrop from '../Backdrop/Backdrop'
import ClearIcon from '@mui/icons-material/Clear';


const Model = (props) => {
    return (
        <React.Fragment>
            <BackDrop closeModel={props.closeModel} show={props.show} />
            {props.show&&<div   className={classes.Model}
                style={{
                    transform: props.show ? "translateY(-50%) translateX(-50%)" : "translateY(-200Vh) translateX(-50%)"}}>
                 <ClearIcon onClick={props.closeModel} className={classes.clear}/>
                {props.children}
            </div>
}
        </React.Fragment>
    )
}

export default Model
