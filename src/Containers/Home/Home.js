import classes from './Home.module.css'
import { fechCategories, fetchHomeData } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Slider from '../../Components/Slider/Slider'
import CategoriesPanal from '../../Components/CategoriesPanal/CategoriesPanal'
import ErrorModal from '../../Components/Errormodel/ErrorModal'
import Spinner from '../../Components/Spinner/Spinner'
import ProductsGroup from '../../Components/products/ProductsGroup';


const Home = () => {
    const dispatch = useDispatch()
    const getCategories = () => dispatch(fechCategories())
    const getHomeData = () => dispatch(fetchHomeData())
    const categories = useSelector(state => state.categories.categories)
    const cateogriesloading = useSelector(state => state.categories.loading)
    const cateogrieserror = useSelector(state => state.categories.error)
    const HomeData = useSelector(state => state.home.HomeData)
    const homeloading = useSelector(state => state.home.loading)
    const homeerror = useSelector(state => state.home.error)


    useEffect(() => {
        if (!HomeData) {
            getHomeData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HomeData])

    return (
        <div className={classes.Home}>
            {cateogrieserror && <ErrorModal Reload={() => getCategories()} />}
            {!cateogriesloading ?
                <div className={classes.topcontainer} >
                    <CategoriesPanal Categories={categories} />
                    <Slider />
                </div> : <Spinner />
            }
            <div>
                {
                    homeloading ?
                        <Spinner /> :
                        homeerror ? <ErrorModal Reload={() => getHomeData()} /> :
                            HomeData && <>
                                <ProductsGroup title=" افضل العروض" products={HomeData.bestoffers} />
                                <ProductsGroup title="الاكثر مبيعا" products={HomeData.bestsellers} />
                                {/* <ProductsGroup title="نرشح لك" products={HomeData.bestsellers} /> */}
                            </>
                }
            </div>
        </div>
    )
}
export default Home
