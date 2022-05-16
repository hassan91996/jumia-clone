import "./checkbox.css"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Checkbox = (props) => {
    return (
        <div className="chexkboxcontainer">
            <label htmlFor={props.element}>
                <div className="Iconcontaninerr">
                    {props.checked ? <CheckBoxIcon style={{ color: "#f68b1e", zIndex: "2" }} /> :
                        <CheckBoxOutlineBlankIcon style={{ color: "#c7c7cd", zIndex: "2" }} />}
                </div>
                <input type="checkbox"
                    value={props.element}
                    checked={props.checked ? true : false}
                    id={props.element}
                    onChange={props.handlechange} />
                {props.element}</label>
        </div>
    )
}

export default Checkbox


