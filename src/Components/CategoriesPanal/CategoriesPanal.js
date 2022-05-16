import React, { useState } from "react"
import classes from './CategoriesPanal.module.css'
import { Link } from "react-router-dom"
import ResponsivePanal from "./ResponsivePanal/ResponsivePanal"

const CategoriesPanal = (props) => {
    const { Categories } = props
    const [subCategories, setsubCategories] = useState([])
    const [showPanal, setshowPanal] = useState("none")
    const handleHover = (category) => {
        setsubCategories(category.children)
        setshowPanal("flex")
    }
    const handleave = () => {
        setshowPanal("none")
    }


    return (
        <>
            <div className={classes.Categories}>
                <ul>
                    {Categories && Categories.filter(cat => cat.parent === undefined).map(category => {
                        return <li onMouseEnter={() => handleHover(category)} key={category._id}
                            onMouseLeave={handleave}>
                            <Link to={`/categories/${category._id}`}>
                                {category.name}
                            </Link>
                        </li>
                    })
                    }
                </ul>
                <div onMouseEnter={() => setshowPanal("flex")}
                    onMouseLeave={handleave}
                    className={classes.subCatrgories}
                    style={{ display: `${showPanal}` }}>

                    {subCategories && subCategories.map(category => {
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
                </div>
            </div >
            <ResponsivePanal Categories={Categories} />
        </>

    )
}

export default React.memo(CategoriesPanal)
