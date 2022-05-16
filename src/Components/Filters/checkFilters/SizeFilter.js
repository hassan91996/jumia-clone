import Checkbox from '../../UI/FormElement/checkbox/checkbox'
import classes from './filters.module.css'

const SizeFilter = (props) => {

    return (
        <div className={classes.checkFilter}>
                    <h5>المقاسات</h5>
                    <div className={classes.ckeckelements}>
                    {props.checked.map((size, index) => <Checkbox
                        key={index}
                        element={size}
                        checked
                        handlechange={props.handlechange} />
                    )}
                    {props.sizes.filter(x=>!props.checked.includes(x)).map((size, index) => <Checkbox
                        key={index}
                        element={size}
                        handlechange={props.handlechange} />
                    )}
                    </div>
        </div>
    )
}

export default SizeFilter
