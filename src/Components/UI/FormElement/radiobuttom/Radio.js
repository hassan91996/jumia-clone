import "./Radio.css"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
const Radio = (props) => {
    const Ischecked = props.checked ===props.element
    return (
        <div className="chexkboxcontainer">
            <label htmlFor={props.element}>
                <div className="Iconcontaninerr">
                    {Ischecked ? <RadioButtonCheckedIcon style={{ color: "#f68b1e", zIndex: "2" }} /> :
                        <RadioButtonUncheckedIcon style={{ color: "#c7c7cd", zIndex: "2" }} />}
                </div>
                <input type="radio"
                    id={props.element}
                    value={props.element}
                    name={props.name}
                    onChange={props.handlechange}
                    checked={Ischecked}
                />
                {props.display}</label>
        </div>
    )
}

export default Radio
