import React from 'react'
import classes from './Spinner.module.css'
import {FadeLoader}from 'react-spinners'
const Spinner = () => {
    const  css=`
    margin:20px;
    `
  return (
    <div className={classes.spinnerModel}>
        <FadeLoader  color='orange'css={css}/>
    </div>
  )
}

export default Spinner