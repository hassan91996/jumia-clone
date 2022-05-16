import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import classes from './rating.module.css'
import { useState, useEffect } from 'react';

const Rating = ({ rate}) => {


    const [state, setstate] = useState([])

    useEffect(() => {
        const rates = []
        for (let i = 5; i > 0; i--) {
            if (i - rate >= 1) {
                rates.push(<StarOutlineIcon  key={i} style={{color:"#cdcdcd",fontSize:"20px"}}/>)
            }
            else if (i - rate >= .5) {
                rates.push(<StarHalfIcon  key={i} style={{color:"#f6b01e",fontSize:"20px"}}/>)
            } else {
                rates.push(<StarIcon  key={i}style={{color:"#f6b01e",fontSize:"20px"}}/>)
            }
        }
        setstate([...rates.reverse()])
    }, [rate])

    return (
        <div className={classes.rating}>
            {
                state.map(i => i)
            }

        </div>
    )
}

export default Rating
