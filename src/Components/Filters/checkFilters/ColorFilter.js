import Checkbox from '../../UI/FormElement/checkbox/checkbox'
import classes from './filters.module.css'

const ColorFilter = (props) => {

    return (
        <div className={classes.checkFilter}>
                    <h5>الألوان</h5>
                    <div className={classes.ckeckelements}>
                    {props.checked.map((color, index) => <Checkbox
                        key={index}
                        element={color}
                        checked
                        handlechange={props.handlechange} />
                    )}
                    {props.colors.filter(x=>!props.checked.includes(x) && x).map((color, index) => <Checkbox
                        key={index}
                        element={color}
                        handlechange={props.handlechange} />
                    )}
                    </div>
        </div>
    )
}

export default ColorFilter
