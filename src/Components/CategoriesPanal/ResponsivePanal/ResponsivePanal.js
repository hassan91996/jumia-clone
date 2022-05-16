import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './ResponsivePanal.module.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ResponsivePanal = ({ Categories }) => {

    const [Category, setCategory] = useState()
    const [MainCategories, setMainCategories] = useState([])


    useEffect(() => {
        if (Categories) {
            const Main = Categories.filter(cat => cat.parent === undefined)
            setMainCategories([...Main])
            setCategory(Main[0])
        }
    }, [Categories])
    return (
            <div className={classes.ResponsivePanal}>
                <ul className={classes.MainCategories}>
                    {MainCategories.map(category => {
                        return <li className={category._id === Category._id ? classes.active : ""} onClick={() => setCategory(category)} key={category._id}>
                            {category.name}
                        </li>
                    })
                    }
                </ul>
                {Category && <div className={classes.subCatrgories}>
                    <Link className={classes.MainLink} to={`/categories/${Category._id}`} >
                        كل المنتجات
                        <ArrowBackIosNewIcon style={{ fontSize: '14px' }} />
                    </Link>
                    {Category.children.map(category => {
                        return <div className={classes.subcategory} key={category._id}>
                            <span> <Link to={`/categories/${category._id}`}>
                                {category.name}</Link>
                            </span>
                            {category.children.length > 0 &&
                                <ul>
                                    {category.children.map(child => <li key={child._id}>
                                        <Link to={`/categories/${child._id}`}> {child.name}
                                        </Link></li>)}
                                </ul>}
                        </div>
                    }
                    )}
                </div>}
            </div>
    )
}
export default ResponsivePanal