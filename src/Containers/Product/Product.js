import { useState, useEffect } from 'react'
import classes from './Product.module.css'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductImages from '../../Components/ProductImages/ProductImages'
import Rating from '../../Components/Rating/rating'
import Model from '../../Components/UI/Model/Model'
import Star from '@mui/icons-material/Star'
import Moment from 'react-moment';
import ForumIcon from '@mui/icons-material/Forum';
import { addLikedItem } from '../../store/actions/index'
import Addtocart from '../../Components/Addtocart/Addtocart'
import SizeModel from '../../Components/Sizemodel/sizeModel'
import ProductsSlider from '../../Components/ProductsSlider/ProductsSlider'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon } from 'react-share'
import Img from '../../Components/UI/Image'
import { useAxios } from '../../hooks/Http-hook'
import ErrorModal from '../../Components/Errormodel/ErrorModal'
import Spinner from '../../Components/Spinner/Bigspinner'



const Product = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()



    const Cart = useSelector(state => state.cart.cartItems)
    const likeproducts = useSelector(state => state.liked.likedItems)
    const IsAuth = useSelector(state => state.auth.token !== null)

    const like = (id) => dispatch(addLikedItem(id))

    const [product, setproduct] = useState()
    const [showModel, setshowModel] = useState(false)
    const [sizemodel, setsizemodel] = useState(false)
    const [ratingData, setRatingData] = useState()
    const [comments, setcomments] = useState()
    const [simlier, setsimlier] = useState()
    const [isLiked, setisLiked] = useState(false)

    const { response, error, fetchData, loading } = useAxios()
    useEffect(() => {
        if (likeproducts && product) {
            setisLiked(likeproducts.find(prod => prod._id === product._id) ? true : false)
        }
    }, [likeproducts, product])

    useEffect(() => {
        fetchData(`/products/${params.product}`, 'get')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.product])

    useEffect(() => {
        if (response) {
            let rategroups = []
            setproduct(response.product)
            let ratingInfo = response.Rating
            let commentData = response.comments
            let similarProducts = response.similarProducts
            if (ratingInfo.length > 0) {
                for (let i = 5; i >= 1; i--) {
                    let rategroup = ratingInfo.find(group => group._id === i)
                    rategroup ? rategroups.push(rategroup)
                        : rategroups.push({
                            _id: i,
                            users: 0
                        })
                }
                setRatingData([...rategroups])
                if (commentData.length > 0) {
                    setcomments([...commentData])
                }
                else {
                    setcomments()
                }
            } else {
                setRatingData()
            }
            if (similarProducts.length > 0) {
                setsimlier(similarProducts)
            } else {
                setsimlier()
            }
        }
    }, [response])

    const likedHandler = (id) => {
        if (IsAuth) {
            like(id)
        }
        else {
            history.push('/auth')
        }
    }
    return (
        <div className={classes.ProductContainer}>
            {loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData(`/products/${params.product}`, 'get')} /> :
                    response && <>
                        <div className={classes.productDetails}>
                            <div className={classes.ProductImagesContainer}>
                                    <ProductImages Images={product.images} handleClick={() => setshowModel(true)} />
                                <hr></hr>
                                <div className={classes.share}>
                                    <FacebookShareButton url={`https://myjumiastor.web.app/products/${product._id}`} >
                                        <FacebookIcon size={"40px"} round style={{ margin: "0 10px" }} />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={`https://myjumiastor.web.app/products/${product._id}`} >
                                        <TwitterIcon size={"40px"} round style={{ margin: "0 10px" }} />
                                    </TwitterShareButton>
                                </div>
                            </div>
                            <div className={classes.ProductInfo}>

                                <div className={classes.ProdTitle}>
                                    <h3>{product.name}</h3>
                                    <div className={classes.like} onClick={() => likedHandler(product._id)}>
                                        {isLiked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                                    </div>
                                </div>

                                {product.brand && <p>  الماركة : {product.brand}</p>}

                                <div style={{ padding: '5px 0' }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {product.rating ? <><Rating rate={product.rating} /><span>({product.numReviews} تقييمات موثقة للمنتج)</span></>
                                            : <><Rating rate={0} /><span style={{ marginRight: "10px" }}>(لم يتم تقييم المنتج بعد)</span></>
                                        }
                                    </div>
                                </div>

                                <div className={classes.priceArea}>
                                    {product.offer ? <><h1>{Math.round(product.price - ((product.offer * product.price) / 100)).toFixed(2)} جنيه</h1>
                                        <div style={{ display: 'flex' }}><del style={{ fontSize: "18px" }}>{product.price.toFixed(2)} جنيه</del>
                                            <div className={classes.offer}>
                                            <span>%</span>   <span> {product.offer} </span>-
                                            </div> </div></>
                                        : <h1>{product.price.toFixed(2)} جنيه</h1>}

                                </div>
                                {simlier && <div className={classes.similer}>
                                    <p>اختيار خيار أخر</p>
                                    <ProductsSlider containerwidth={790} elementwidth={150} step={450}>
                                        {
                                            simlier.map((sim, i) => <Img key={i} onClick={() => history.push(`/products/${sim._id}`)}
                                                src={sim.img.url} alt="simproduct" />)
                                        }
                                    </ProductsSlider>
                                </div>
                                }
                                {product.sizes.length > 0 && <div className={classes.sizes}><p>اختيار مقاس اخر</p>
                                    <div className={classes.sizesContainer}>
                                        {product.sizes.map((size, i) => <p key={i} className={size.quantity > 0 ? classes.size : classes.emptysize} onClick={() => setsizemodel(true)}>{size.size}</p>)}
                                    </div>
                                    <SizeModel show={sizemodel} cart={Cart}
                                        closeModel={() => setsizemodel(false)} product={product}
                                    />
                                </div>
                                }
                                <Addtocart product={product} cart={Cart} />
                            </div>

                            <Model show={showModel} closeModel={() => setshowModel(false)}>
                                <div className={classes.ProductGallary}>
                                    <p>صور المنتج</p>
                                    <ProductImages Images={product.images} />
                                </div>
                            </Model>
                        </div>
                        <div className={classes.productReviews} >
                            <h3>اراء العملاء الموثوقة</h3>
                            <div className={classes.ReviewsComment}>
                                {ratingData ?
                                    <>
                                        <div className={classes.ratingArea}>
                                            <h4>التقييمات الموثقة للمنتج ( {product.numReviews} ) </h4>
                                            <div className={classes.rateingHeader}>
                                                <h1><b>{product.rating}</b>/5</h1>
                                                <Rating rate={product.rating} />
                                                <p>
                                                    {product.numReviews} تقيمات موثوقة
                                                </p>
                                            </div>
                                            <div className={classes.Reviewsvalues}>
                                                {
                                                    ratingData.map((rate, i) => <div className={classes.rateLine} key={i}>
                                                        <div className={classes.groupInfo}>   <b>{rate._id}</b>
                                                            <Star style={{ color: "orange", margin: "0 5px" }} />
                                                            <p>({rate.users})</p></div>
                                                        <div className={classes.single}>
                                                            <div style={{ width: `${(rate.users / product.numReviews) * 100}%` }}>
                                                            </div>
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                        <div className={classes.commentArea} >
                                            {comments ?
                                                <>
                                                    <h4>تعليقات المنتج ( {comments.length} ) </h4>
                                                    <div className={classes.comments}>
                                                        {comments.map((comment, i) => <div className={classes.comment} key={i}>
                                                            <Rating rate={comment.rating} />
                                                            <p>{comment.comment}</p>
                                                            <span style={{ color: "#75757a" }}> <Moment format="YYYY-MM-DD">
                                                                {comment.createdAt}
                                                            </Moment> بواسطة {comment.userId.username}  </span> </div>)}
                                                    </div>
                                                </> : <div className={classes.noReviews}>
                                                    <ForumIcon style={{ fontSize: '80px', color: "#ededed" }} />
                                                    <p>لا توجد تعليقات لهذا المنتج بعد</p>
                                                </div>
                                            }
                                        </div>
                                    </>
                                    : <div className={classes.noReviews}>
                                        <ForumIcon style={{ fontSize: '80px', color: "#ededed" }} />
                                        <p>لم يتم تقييم المنتج بعد</p>
                                    </div>}
                            </div>
                        </div>
                    </>}

        </div >
    )
}

export default Product
