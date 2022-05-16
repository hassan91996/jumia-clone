import classes from './product.module.css'
import Img from '../../UI/Image'
import { useHistory } from 'react-router-dom';

const Product = ({ product }) => {
    const history = useHistory()
    return (
        <div className={classes.Product} onClick={() => history.push(`/products/${product._id}`)}>
            <Img src={`${product.images[0]&&product.images[0].url}`} alt="productImg" />
            <div className={classes.description}>
                <p> {product.name}</p>
                {product.offer ? <>
                    <h4>جنيه {Math.round(product.price - ((product.offer * product.price) / 100)).toFixed(2)}</h4>
                    <del>جنيه {product.price.toFixed(2)}</del>
                </> : <h4>جنيه {product.price.toFixed(2)}</h4>}
            </div>
            {product.offer && <div className={classes.offer}>
            <span>%</span>   <span> {product.offer} </span>-
            </div>}
        </div>
    )
}

export default Product
