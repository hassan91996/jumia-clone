import classes from './product.module.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Img from '../UI/Image'
import Rating from '../Rating/rating';
import Addtocart from '../Addtocart/Addtocart';


const Product = ({ product }) => {

    const history = useHistory()
    const cart = useSelector(state => state.cart.cartItems)
    return (
        <div className={classes.CategoryProduct}>
            <div className={classes.productData} >
                <Img src={`${product.images[0]&&product.images[0].url}`} alt="productImg" onClick={() => history.push(`/products/${product._id}`)} />
                <div className={classes.description}>
                    <div className={classes.descriptioneData} onClick={() => history.push(`/products/${product._id}`)}>
                        <p> {product.name}</p>
                        {product.offer ? <>
                            <h5>جنيه {Math.round(product.price - ((product.offer * product.price) / 100)).toFixed(2)}</h5>
                            <div className={classes.offerArea}><del>جنيه {product.price.toFixed(2)}</del> <div className={classes.offer}>
                                <span>%</span>   <span> {product.offer} </span>-</div></div>
                        </> : <h5>جنيه {product.price.toFixed(2)}</h5>}
                        {product.rating && <div className={classes.rateArea}>
                            <Rating rate={product.rating} /><span>({product.numReviews})</span></div>}
                    </div>
                    <div className={classes.ResponsiveAdd}>
                        <Addtocart product={product} />
                    </div>
                </div>
            </div>
            <div className={cart && cart.find(x => x._id === product._id) ? [classes.AddtocartArea, classes.opacity].join(' ') : classes.AddtocartArea}>
                <Addtocart product={product} />
            </div>
        </div>

    )
}

export default Product
