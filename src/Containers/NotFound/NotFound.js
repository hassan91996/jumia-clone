import classes from './NotFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={classes.notfound}>
            <h1>404</h1>
            <p>الصفحة غير موجودة</p>
            <Link to="/" >تسوق</Link>
        </div >
    )
}

export default NotFound
