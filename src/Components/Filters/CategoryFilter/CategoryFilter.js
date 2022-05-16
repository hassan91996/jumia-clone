import React from 'react'
import classes from './categoryFilter.module.css'
import { Link } from 'react-router-dom'

const categoryFilter = ({ category,handleClick}) => {
    return (
        <div className={classes.Categoriescontainer}>
            <h5>الفئة</h5>
            {category.parent &&
                <Link to={`/categories/${category.parent._id}`} onClick={handleClick}>
                    {category.parent.name}
                </Link>
            }
            <span >
                <Link to={`/categories/${category._id}`} onClick={handleClick}>
                    {category.name}
                </Link>
            </span>
            {category.children && <ul>
                {
                    category.children.map(child => {
                        return <li key={child._id}>
                            <Link to={ `/categories/${child._id}`} onClick={handleClick}>
                                {child.name}
                            </Link>
                        </li>
                    })
                }
            </ul>}
        </div>
    )
}

export default categoryFilter
