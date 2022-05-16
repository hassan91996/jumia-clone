import React, { useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom'
import Product from '../../Components/Product/product'
import classes from './Searchresultes.module.css'
import ErrorModal from '../../Components/Errormodel/ErrorModal';
import { useAxios } from '../../hooks/Http-hook';
import Spinner from '../../Components/Spinner/Bigspinner';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';


const Searchresultes = () => {
    const location = useLocation()
    const pattern = location.state.pattern


    const { error, loading, fetchData, response } = useAxios()

    useEffect(() => {
        fetchData(`/products/search?search=${pattern}`, 'get')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pattern])



    return <div className={classes.Searchresultes}>
        {
            loading ? <Spinner /> :
                error ? <ErrorModal Reload={() => fetchData(`/products/search?search=${pattern}`, 'get')} /> :
                    response && response.products.length > 0 ? response.products.map(prod => <Product product={prod} key={prod._id} />) :
                        <div className={classes.noProducts}>
                            <SearchOffOutlinedIcon style={{ fontSize: '100px', color: "#ededed" }} />
                            <h4> لا توجد نتائج بحث عن {pattern} </h4>
                            <Link to="/" >تسوق</Link>
                        </div>
        }
    </div>;
};

export default Searchresultes;
