import React from 'react';
import Radio from '../../UI/FormElement/radiobuttom/Radio'
import classes from './filters.module.css'

const OfferFilter = (props) => {
    const offer = (Math.floor(props.offer / 10)) > 5 ? 5 : Math.floor(props.offer / 10)

    const filter = []
    for (let i = offer; i >= 1; i--) {
        filter.push(<Radio
            name='offer'
            display={<p>{i * 10}% أو أعلي</p>}
            checked={Number(props.checked)}
            key={i}
            element={i * 10}
            handlechange={props.handlechange}
        />)
    }
    return <div className={classes.RadioFilter}>
        <div className={classes.filterHeader}>
            <h5>نسبة الخصم</h5>
            <button onClick={props.setFilter}> إعادة تعيين</button>
        </div>
        {filter}
    </div>;
};

export default OfferFilter;
