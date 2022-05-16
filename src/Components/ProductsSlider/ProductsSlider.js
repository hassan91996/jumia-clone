import React, { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classes from './ProductsSlider.module.css'

const ProductsSlider = ({children,containerwidth,elementwidth,step}) => {

    const [distance, setdistance] = useState()
    const [leftdistance, setleftdistance] = useState()
    const [rightdistance, setrightdistance] = useState(0)
    const [length, setlength] = useState()

    useEffect(() => {
        if (children) {
            setleftdistance((children.length* elementwidth) - containerwidth)
            setlength(children.length * elementwidth)
        }
    }, [children,containerwidth,elementwidth,step])

    const handleArrow = (direction) => {
        if (direction === "right") {
            if (rightdistance < step) {
                setdistance(0)
                setleftdistance(length - containerwidth)
                setrightdistance(0)
            } else {
                setdistance(rightdistance - step)
                setleftdistance(leftdistance + step)
                setrightdistance(rightdistance - step)
            }
        }
        if (direction === "left") {
            if (leftdistance < step) {
                setdistance(rightdistance + leftdistance)
                setleftdistance(0)
                setrightdistance(length - containerwidth)
            } else {
                setdistance(rightdistance + step)
                setleftdistance(leftdistance - step)
                setrightdistance(rightdistance + step)
            }
        }
    }
    return<div className={classes.itemsSlider}>
        <div className={classes.rightIconContainer}
            onClick={() => { handleArrow("right") }}
            style={{ visibility: rightdistance > 0 ? "visible" : "hidden" }}
        >
            < ArrowForwardIosIcon style={{ fontSize: "12px" }} />
        </div>
        <div className={classes.sliderContent} style={{ transform: `translateX(${distance}px)` }}  >
            {children}
        </div>
        <div className={classes.leftIconContainer} onClick={() => { handleArrow("left") }}
            style={{ visibility: leftdistance > 0 ? "visible" : "hidden" }} >
            <ArrowBackIosNewIcon style={{ fontSize: "12px" }} />
        </div>
    </div>
};

export default ProductsSlider;
