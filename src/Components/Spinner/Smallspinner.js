import React from 'react'
import classes from './Smallspinner.module.css'
import { FadeLoader } from 'react-spinners'
const Spinner = () => {
  const spinner = `  margin : 10px auto `

  return (
    <div className={classes.smallspinnerModel}>
      <FadeLoader height={10} color="orange" margin={-5} css={spinner} /> </div>
  )
}

export default Spinner