import React from 'react';
import Radio from '../../UI/FormElement/radiobuttom/Radio'
import Rating from '../../Rating/rating'
import classes from './filters.module.css'


const RateFilter = (props) => {
    const ratenumber = Math.floor(props.rate) === 5 ? 4 : Math.floor(props.rate)
    const filter = []
    for (let i = ratenumber; i >= 1; i--) {
        filter.push(<Radio
            name='rate'
            display={<div style={{ display: 'flex' }}><Rating rate={i} /> أو أعلي </div>}
            checked={Number(props.checked)}
            key={i}
            element={i}
            handlechange={props.handlechange}
        />)
    }
    return <div className={classes.RadioFilter}>
        <div className={classes.filterHeader}>
            <h5>تقييم المنتج</h5>
            <button onClick={props.setFilter}> إعادة تعيين</button>
        </div>
        {filter}
    </div>;
};

export default RateFilter;
