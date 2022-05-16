import Checkbox from '../../UI/FormElement/checkbox/checkbox'
import classes from './filters.module.css'

const BrandFilter = (props) => {
    return (
        <div className={classes.checkFilter}>
                    <h5>الماركات</h5>
                    <div className={classes.ckeckelements}>  
                    {props.checked.map((brand, index) => <Checkbox
                        key={index}
                        element={brand}
                        checked
                        handlechange={props.handlechange} />
                    )}
                    {props.brands.filter(x=>!props.checked.includes(x) && x).map((brand, index) => <Checkbox
                        key={index}
                        element={brand}
                        handlechange={props.handlechange} />
                    )}
                    </div>
        </div>
    )
}

export default BrandFilter
