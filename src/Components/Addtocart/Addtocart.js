import React, { useState, useEffect } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addcartItem, reducecartItem } from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import Size from '../Sizemodel/sizeModel'
import classes from './Addtocart.module.css'
import { useHistory } from 'react-router-dom';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const Addtocart = ({ product }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const addone = (id, size) => dispatch(addcartItem(id, size))
    const deleteone = (id, size) => dispatch(reducecartItem(id, size))
    const cart = useSelector(state => state.cart.cartItems)
    const IsAuth = useSelector(state => state.auth.token !== null)
    const [sizes, setsizes] = useState();
    const [countproduct, setcountproduct] = useState(0);
    const [TotalQuntity, setTotalQuntity] = useState(0);
    const [showModel, setshowModel] = useState(false);

    useEffect(() => {
        if (!product.quantity) {
            setsizes([...product.sizes])
        }
        else {
            setsizes()
        }

        setTotalQuntity(product.sizes.length === 0 ? product.quantity :
            product.sizes.reduce((a, c) => a + c.quantity, 0))
    }, [product]);
    const handleadd = () => {
        if (IsAuth) {
            if (product.sizes.length > 0) {
                setshowModel(true)
            } else {
                addone(product._id)
            }
        } else {
            history.push('/auth')
        }

    }
    const handlereduce = () => {
        if (!product.quantity) {
            setshowModel(true)
        } else {
            deleteone(product._id)
        }
    }


    useEffect(() => {
        if (cart) {
            setcountproduct(cart.filter(prod => prod._id === product._id)
                .reduce((a, c) => a + c.quantity, 0))
        }
    }, [cart, product])

    return <div className={classes.addtoChart}>
        {TotalQuntity > 0 ? <>
            {countproduct === 0 ? <button className={classes.addbutton} onClick={handleadd}>
                اضافة لسلة التسوق
            </button> :
                <div className={classes.quntityArea}>
                    <div className={classes.quantitycontrole}>
                        <button onClick={() => handlereduce()}><RemoveIcon /></button><span>{countproduct}</span><button disabled={TotalQuntity <= countproduct} onClick={handleadd}><AddIcon /></button>
                    </div>
                    <p >(تم اضافة ({countproduct})  منتجات )</p>
                </div>
                }
            {sizes && <Size show={showModel}
                cart={cart}
                closeModel={() => setshowModel(false)} product={product}
                sizes={sizes} />}
        </> :
            <div className={classes.empty}>
                <DoNotDisturbAltIcon style={{ margin: '0 10px' }} />
                نفذ المخزون
            </div>
        }


    </div>;
};

export default React.memo(Addtocart);
