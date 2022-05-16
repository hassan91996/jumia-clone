import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import classes from './Errormodal.module.css'


const ErrorModal = props => {
  return (
    <div className={classes.Errormodal} onClick={props.Reload}>
            <RefreshIcon />
      <p> حدث خطأ ماانقر لإعادة التحميل{props.error}</p>
    </div>
  );
};

export default ErrorModal;
