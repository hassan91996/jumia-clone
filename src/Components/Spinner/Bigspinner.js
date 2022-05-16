import React from 'react'
import classes from './Bigspinner.module.css'
import {FadeLoader}from 'react-spinners'
const Bigspinner = () => {
    const  css=`
    margin:20px;
    `
  return (
    <div className={classes.bigspinnerModel}>
        <FadeLoader  color='orange'css={css}/>
    </div>
  )
}

export default Bigspinner