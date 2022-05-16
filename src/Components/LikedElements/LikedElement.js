import classes from './LikedElement.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { addLikedItem } from '../../store/actions/index'
import { useDispatch } from 'react-redux';
import Img from '../UI/Image'
import { Link } from 'react-router-dom';


const LikedElement = ({ product }) => {
    const dispatch = useDispatch()
    const Like = (id) => dispatch(addLikedItem(id))
    return (
        <div className={classes.LikedElement}>
            <div className={classes.productData}>
                <Img src={`${product.images[0]&&product.images[0].url}`} alt="liked" />
                <div className={classes.Detailes} >
                    <span >{product.name}</span>
                    <span> {product.size}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <Link to={`/products/${product._id}`}>عرض المنتج</Link>
                <span onClick={() => Like(product._id)}><DeleteIcon className={classes.Icon} /> حذف</span>
            </div>

        </div>
    )
}

export default LikedElement
