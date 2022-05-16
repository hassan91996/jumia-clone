import './price.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';




const Price = (props) => {

    const minvalue = useSelector(state => state.products.min)
    const maxvalue = useSelector(state => state.products.max)
    const [left, setleft] = useState(0)
    const [right, setright] = useState(0)
    const [rightpersent, setrightpersent] = useState(0)
    const [leftpersent, setleftpersent] = useState(0)
    const [rangeright, setrangeright] = useState(0)
    const [rangeleft, setrangeleft] = useState(0)

    const countPersent = (val) => {
        return ((val - minvalue) / (maxvalue - minvalue)) * 100;
    }

    useEffect(() => {
        setleft(maxvalue)
        setright(minvalue)
        setleftpersent(0)
        setrightpersent(0)
        setrangeright(0)
        setrangeleft(0)

        if (props.min && props.max) {
            if (maxvalue > props.max) {
                setleft(props.max)
                setleftpersent(100 - countPersent(props.max))
                setrangeleft(100 - countPersent(props.max))
            }
            if (minvalue < props.min) {
                setright(props.min)
                setrightpersent(countPersent(props.min))
                setrangeright(countPersent(props.min))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxvalue, minvalue, props.min, props.max])

    const handleleftchange = (e) => {
        let val = parseInt(e.target.value);
        if (val > Math.min(right, left) && val < maxvalue) {
            setleft(val)
            let percent = countPersent(val)
            setleftpersent(100 - percent)
            setrangeleft(100 - percent)
        } else if (val >= maxvalue) {
            setleft(maxvalue)
            setleftpersent(0)
            setrangeleft(0)
        } else {
            setleft(right + 1)
            let newpercent = countPersent(right + 1)
            setleftpersent(100 - newpercent)
            setrangeleft(100 - newpercent)
        }
    }

    const handleRightcahnge = (e) => {
        let val = parseInt(e.target.value);

        if (val > minvalue && val < Math.max(right, left)) {
            let percent = countPersent(val)
            setright(val)
            setrightpersent(percent)
            setrangeright(percent)
        }
        else if (val <= minvalue) {
            let zeropercent = countPersent(minvalue)
            setright(minvalue)
            setrightpersent(zeropercent)
            setrangeright(zeropercent)
        }
        else {
            let newpercent = countPersent(left - 1)
            setright(left - 1)
            setrightpersent(newpercent)
            setrangeright(newpercent)
        }
    }
    const setLeftValue = (e) => {
        let val = parseInt(e.target.value)
        let percent = countPersent(val)
        setleftpersent(100 - percent)
        if (val > parseInt(right)) {
            setrangeright(rightpersent)
            setrangeleft(100 - percent)
        } else {
            setrangeright(percent)
            setrangeleft(100 - rightpersent)
        }
    }
    const setRightValue = (e) => {
        let val = parseInt(e.target.value);
        let percent = countPersent(val)
        setrightpersent(percent)
        if (val < parseInt(left)) {
            setrangeright(percent)
            setrangeleft(leftpersent)
        } else {
            setrangeright(100 - leftpersent)
            setrangeleft(100 - percent)
        }
    }

    return (
        <div className="pricefilter">
            <div className='priceheader'>
                <h5>السعر (جنيه)</h5>
                <button onClick={() => props.handlechange(left, right)}>تطبيق</button>

            </div>
            <div className="pricePointer">
                <input type="range" min={minvalue} max={maxvalue} value={left} onChange={setLeftValue} onInput={(e) => setleft(e.target.value)} />
                <input type="range" min={minvalue} max={maxvalue} value={right} onChange={setRightValue} onInput={(e) => setright(e.target.value)} />
                <div className="slider">
                    <div className="track"></div>
                    <div style={{ left: `${rangeleft}%`, right: `${rangeright}%` }} className="range"></div>
                    <div style={{ left: `${leftpersent}%` }} className="pointer left"></div>
                    <div className="pointer right" style={{ right: `${rightpersent}%` }}></div>
                </div>
            </div>
            <div className='rangeInfo'>
                <input type="number" placeholder='اقل قيمة' value={Math.min(right, left)} onChange={handleRightcahnge} /><span>-</span>
                <input type="number" placeholder='اعلي قيمة' value={Math.max(right, left)} onChange={handleleftchange} />
            </div>
        </div>


    )
}
export default Price

