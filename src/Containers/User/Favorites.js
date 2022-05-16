import React from 'react';
import classes from './Favorites.module.css'
import { useSelector, useDispatch } from 'react-redux'
import LikedElement from '../../Components/LikedElements/LikedElement';
import { Link } from 'react-router-dom';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ErrorModal from '../../Components/Errormodel/ErrorModal';
import { fetchLikedItems } from '../../store/actions/index'
import Spinner from '../../Components/Spinner/Spinner';

const Favorite = () => {

  const dispatch = useDispatch()
  const getlikedProducts = () => dispatch(fetchLikedItems())
  const Liked = useSelector(state => state.liked.likedItems)
  const Loading = useSelector(state => state.liked.loading)
  const Error = useSelector(state => state.liked.error)

  return (
    <div className={classes.Favorites}>
      <p> المنتجات المحفوظة ({Liked.length})</p>
      <div className={classes.FavProducts} >
        {
          Loading ? <Spinner /> :
            Error ? <ErrorModal Reload={() => getlikedProducts()} /> :
              Liked.length > 0 ? Liked.map(prod => <LikedElement product={prod} key={prod._id} />) :
                <div className={classes.emptyliked}>
                  <VolunteerActivismIcon style={{ fontSize: '100px', color: "#ededed" }} />
                  <h4>لا يوجد منتجات محفوظة</h4>
                  <Link to="/" >تسوق</Link>
                </div>
        }

      </div>
    </div>
  )
};

export default Favorite;
