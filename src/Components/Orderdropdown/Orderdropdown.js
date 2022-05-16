import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import classes from './Orderdropdown.module.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Dropdown = ({ orderBy, handelchange }) => {
    const options =useMemo(()=> [
        { value: "newest", lable: "وصل حديثا" },
        { value: "priceAsc", lable: "السعر:الاقل إلي الأعلي" },
        { value: "priceDesc", lable: "السعر:الأعلي إلي الأقل" }
    ],[])

    const handleclick = (option) => {
        handelchange(option.value)
        setselected(option)
        setopen(false)
    }

    const [open, setopen] = useState(false)
    const [selected, setselected] = useState()
    useEffect(() => {
        setselected(options.filter(op => op.value === orderBy)[0])
    }, [orderBy,options])

    return (
        <>
            {selected &&
                <div onClick={() => setopen(!open)} className={classes.dropdownList}>
                    <div className={classes.dropbutton}> <span> ترتيب حسب : </span> {selected.lable}
                        {!open ? <KeyboardArrowDownIcon style={{ margin: "0 5px 0 0" }} /> : <KeyboardArrowUpIcon />}</div>
                    <div style={{ display: open ? "flex" : "none" }} className={classes.optionsList}>
                        {options.map(option => <span key={option.value} onClick={() => handleclick(option)}
                            className={selected.value === option.value ? classes.active : null}
                        >{option.lable}</span>)}
                    </div>
                </div>
            }
        </>

    )
}

export default Dropdown
