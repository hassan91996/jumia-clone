import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './errorLine.css'

const errorLine = ({error}) => {
  return<div className="errorline">{error}<HighlightOffIcon/></div>

};
export default errorLine;
