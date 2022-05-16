import { useEffect, useState } from 'react'
import classes from './Rating.module.css'
import Model from '../../Components/UI/Model/Model'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useAxios } from '../../hooks/Http-hook'
import Spinner from '../../Components/Spinner/Spinner'
import ErrorModal from '../../Components/Errormodel/ErrorModal'
import Errorline from '../../Components/Errormodel/errorLine'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Img from '../../Components/UI/Image';
import axios from '../../axios';
import { Link } from 'react-router-dom';


const Rating = () => {

    const [showModel, setshowModel] = useState(false)
    const [products, setproducts] = useState([])
    const [rate, setrate] = useState(0)
    const [stars, setstars] = useState()
    const [comment, setcomment] = useState()
    const [product, setproduct] = useState()
    const [formError, setformError] = useState()

    const { loading, error, response, fetchData } = useAxios()

    useEffect(() => {
        fetchData('users/me/allowtorate', 'get')
        return () => {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (response) {
            setproducts([...response.products])
        }
    }, [response])
    useEffect(() => {
        let m = []
        for (let i = 0; i < 5; i++) {
            if (i < rate) {
                m.push(<StarIcon key={i} style={{ color: "#f6b01e", fontSize: "40px", cursor: "pointer" }} onClick={() => setrate(i + 1)} />)
            }
            else {
                m.push(<StarOutlineIcon key={i} style={{ color: "#cdcdcd", fontSize: "40px", cursor: "pointer" }} onClick={() => setrate(i + 1)} />)
            }
        }
        setstars([...m])
    }, [rate])

    const closeModel = () => {
        setshowModel(false)
        setrate(0)
        setcomment()
        setproduct()
    }
    const handleShow = (id) => {
        setproduct(id)
        setshowModel(true)
    }

    const saveRate = async () => {
        const RateData = {
            rate: rate,
            comment: comment
        }
        try {
            await axios.post(`products/rateproduct/${product}`, RateData)
            setproducts(products.filter(prod => prod._id !== product))
            closeModel()
            setformError()
        } catch (e) {
            setformError(error)
        }

    }
    return (
        <div className={classes.RateProducts}>
            {loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData('users/me/allowtorate', 'get')} /> :
                    products.length > 0 ? <> {products.map((product, i) => <div key={i} className={classes.rateproduct}>
                        <div className={classes.productData}>
                            <Img src={`${product.images[0] && product.images[0].url}`} alt="liked" />
                            <div className={classes.Detailes} >
                                <span >{product.name}</span>
                            </div>
                        </div>
                        <div className={classes.actions}>
                            <button onClick={() => handleShow(product._id)}><NoteAltOutlinedIcon style={{ marginLeft: "5px" }} />تقييم</button>
                        </div>
                    </div>
                    )}
                        < Model show={showModel}
                            closeModel={closeModel}>
                            <div className={classes.rateModal}>
                                {formError && <Errorline error={formError} />}
                                <span>التقييم </span>
                                <div className={classes.stars}>
                                    {
                                        stars && stars.map(star => star)
                                    }
                                </div>
                                <textarea
                                    type="textArea"
                                    placeholder='اكتب تعليقك هنا'
                                    value={comment}
                                    onChange={(e) => setcomment(e.target.value)} />
                                <button onClick={saveRate} disabled={rate < 1}>حفظ</button>
                            </div>
                        </Model></> :
                        <div className={classes.emptyRates}>
                            <ThumbUpIcon style={{ fontSize: '100px', color: "#ededed" }} />
                            <h4>لقد قمت بتقييم جميع منتجاتك</h4>
                            <Link to="/" >تسوق</Link>
                        </div>
            }
        </div >
    )
}

export default Rating
