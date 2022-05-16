import { useEffect, useState } from 'react';
import Model from '../UI/Model/Model'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addcartItem, reducecartItem } from '../../store/actions/index'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './sizemodel.module.css'
const SizeModel = ({ show, closeModel, product, cart }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const addone = (id, size) => dispatch(addcartItem(id, size))
    const deleteone = (id, size) => dispatch(reducecartItem(id, size))
    const IsAuth = useSelector(state => state.auth.token !== null)
    const [emptysizes, setemptysizes] = useState();
    const [sizes, setsizes] = useState();

    useEffect(() => {
        let empty = []
            , notempty = []
        for (const size of product.sizes) {
            if (size.quantity >= 1) {
                notempty.push(size)
            } else {
                empty.push(size)
            }
        }
        notempty.length > 0 ? setsizes([...notempty]) : setsizes()
        empty.length > 0 ? setemptysizes([...empty]) : setemptysizes()

    }, [product]);


    const handledeleteone = (id, size) => {
        if (IsAuth) {
            deleteone(id, size)
        }
        else {
            history.push('/auth')

        }
    }
    const handleaddone = (id, size) => {
        if (IsAuth) {
            addone(id, size)
        }
        else {
            history.push('/auth')

        }
    }
    const countsize = (size) => {
        const count = cart && cart.find(prod => prod._id === product._id && prod.size === size)
        return count ? count.quantity : 0
    }
    return <Model show={show} closeModel={closeModel}>
        <div className={classes.sizemodel} >
            <h2> المقاسات </h2>
            <div className={classes.Productsizes}>
                {sizes && sizes.map((size, i) =>
                    <div key={i} className={classes.size}>
                        <h3>{size.size}</h3>
                        <div className={classes.quantity}>
                            <button disabled={countsize(size.size) === 0} onClick={() => handledeleteone(product._id, size.size)}><RemoveIcon /></button>
                            <span>{countsize(size.size)}</span>
                            <button disabled={size.quantity === countsize(size.size)} onClick={() => handleaddone(product._id, size.size)}><AddIcon /></button>
                        </div>
                    </div>)
                }
            </div>

            {
                emptysizes && <div className={classes.emptysizes}>
                    <span>   غبر متوفر حاليًا:    </span>
                    {
                        emptysizes.map((es, i) => <span key={i}>{es.size} </span>)
                    }
                </div>
            }
            <div className={classes.buttons}>
                <button style={{ flex: "1" }} onClick={closeModel}>متابعة التسوق</button>
                <Link to="/cart">عرض سلة التسوق </Link>
            </div>
        </div>


    </Model>
};

export default SizeModel;
