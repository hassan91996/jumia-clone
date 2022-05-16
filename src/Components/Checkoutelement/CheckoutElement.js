import classes from './CheckoutElement.module.css'
import { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addcartItem, deletecartItem, reducecartItem, addLikedItem } from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import Img from '../UI/Image'
import { Link } from 'react-router-dom';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';



const CheckoutElement = ({ product }) => {

    const dispatch = useDispatch()
    const Liked = useSelector(state => state.liked.likedItems)
    const addone = (id, size) => dispatch(addcartItem(id, size))
    const deletHandler = (id, size) => dispatch(deletecartItem(id, size))
    const deleteone = (id, size) => dispatch(reducecartItem(id, size))
    const like = (id) => dispatch(addLikedItem(id))


    const [isliked, setisLiked] = useState();
    useEffect(() => {
        Liked.find(like => like._id === product._id) ? setisLiked(true) : setisLiked()
    }, [Liked, product]);



    const saveLater = () => {
        like(product._id)
        deletHandler(product._id, product.size)
    }
    return (
        <div className={classes.CheckoutElement}>
            <div className={classes.Desktopcontainer}>
                <Img src={`${product.image.url}`} alt="CartProduct" />
                <div className={classes.Detailes} >
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                    <span> {product.size}</span>
                    <div className={classes.actions}>
                        {!isliked && <span onClick={saveLater}><FavoriteIcon className={classes.Icon} /> الحفظ لوقت لاحق</span>}
                        <span onClick={() => deletHandler(product._id, product.size)}><DeleteIcon className={classes.Icon} /> حذف</span>
                    </div>
                </div>
                {product.inStock > 0 ?
                    <>
                        <div className={classes.amount}>
                            <RemoveIcon className={product.quantity === 1 ? classes.disablecontrolIcon : classes.controlIcon} onClick={() => deleteone(product._id, product.size)} />
                            <span>{product.quantity}</span>
                            <AddIcon className={product.quantity === product.inStock ? classes.disablecontrolIcon : classes.controlIcon} onClick={() => addone(product._id, product.size)} />
                        </div>
                        <div className={classes.price}>
                            {product.offer ? <>
                                <p>{product.currentPrice} ج.م</p>
                                <del>{product.price.toFixed(2)} ج.م</del>
                                <span> تم توفير :{(product.price - product.currentPrice).toFixed(2)} ج.م</span>
                            </> : <p>{product.price} ج.م</p>
                            }
                        </div>
                        <div className={classes.totalPrice}>
                            <p>{((product.currentPrice ? product.currentPrice : product.price) * product.quantity).toFixed(2)} ج.م</p>
                        </div></>
                    :
                    <div className={classes.noStock}>
                        <div>
                            <DoNotDisturbAltIcon style={{ margin: '0 10px' }} />
                            نفذ المخزون
                        </div>
                    </div>}
            </div>
            <div className={classes.ResponsiveContainer}>
                <Link to={`/products/${product._id}`} className={classes.ProductInfo} >
                    <Img src={`${product.image.url}`} alt="CartProduct" />
                    {product.offer && <div className={classes.offer}>
                        <span>%</span>   <span> {product.offer} </span>-
                    </div>}
                    <div className={classes.Data} >
                        <p >{product.name}</p>
                        <span> {product.size}</span>
                        <div className={classes.Resprice}>
                            {product.offer ? <>
                                <b style={{ marginLeft: "10px" }}>{product.currentPrice} ج.م</b>
                                <del>{product.price.toFixed(2)} ج.م</del>
                            </> : <b>{product.price} ج.م</b>
                            }
                        </div>
                    </div>
                </Link>
                <div className={classes.ProductBottom}>
                    <div className={classes.actions}>
                        {!isliked && <span onClick={saveLater}><FavoriteIcon className={classes.Icon} /> الحفظ لوقت لاحق</span>}
                        <span onClick={() => deletHandler(product._id, product.size)}><DeleteIcon className={classes.Icon} /> حذف</span>
                    </div>
                    {product.inStock > 0 ? <div className={classes.amount}>
                        <RemoveIcon className={product.quantity === 1 ? classes.disablecontrolIcon : classes.controlIcon} onClick={() => deleteone(product._id, product.size)} />
                        <span>{product.quantity}</span>
                        <AddIcon className={product.quantity === product.inStock ? classes.disablecontrolIcon : classes.controlIcon} onClick={() => addone(product._id, product.size)} />
                    </div> :
                        <div className={classes.Nostock}>
                            <DoNotDisturbAltIcon style={{ margin: '0 10px' }} />
                            نفذ المخزون
                        </div>
                    }
                </div>
            </div >
        </div >
    )
}

export default CheckoutElement
