import { useEffect, useState } from 'react'
import classes from './ProductImages.module.css'
import Img from '../UI/Image'

const ProductImages = ({ Images, handleClick }) => {
    const [image, setImage] = useState({})
    useEffect(() => {
        setImage(Images[0])
    }, [Images])
    return (
        <div className={classes.ProductimageContainer}>
            <div className={classes.mainImage}>
                <Img src={`${image.url}`} alt="prodImage" onClick={handleClick} />
            </div>
            <div className={classes.small}>
                {Images.map((img,i) => <Img key={i} alt="prodImage"
                    className={img.id === image.id ? classes.active : ''}
                    src={`${img.url}`}
                    onClick={() => setImage(img)} />)}
            </div>
        </div>

    )
}

export default ProductImages
