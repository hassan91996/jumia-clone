import React, { useEffect, useState } from 'react'
import classes from './Category.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchProducts } from '../../store/actions/index'
import CategoryFilter from '../../Components/Filters/CategoryFilter/CategoryFilter'
import Price from '../../Components/Filters/PriceFilter/price'
import PagePagination from '../../Components/Pagination/pagination'
import Dropdown from '../../Components/Orderdropdown/Orderdropdown'
import BrandFilter from '../../Components/Filters/checkFilters/BrandFilter'
import ColorFilter from '../../Components/Filters/checkFilters/ColorFilter'
import SizeFilter from '../../Components/Filters/checkFilters/SizeFilter'
import RateFilter from '../../Components/Filters/RadioFilters/Rating'
import OfferFilter from '../../Components/Filters/RadioFilters/Offer'
import Product from '../../Components/Product/product'
import Bigspinner from '../../Components/Spinner/Bigspinner'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideDrawer from '../../Components/UI/SideDrawer/SideDrawer'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Category = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const Categories = useSelector(state => state.categories.categories)
  const Pcount = useSelector(state => state.products.count)
  const Pcolors = useSelector(state => state.products.colors)
  const Pmin = useSelector(state => state.products.min)
  const Psizes = useSelector(state => state.products.sizes)
  const Pbrands = useSelector(state => state.products.brands)
  const Prate = useSelector(state => state.products.rate)
  const Poffer = useSelector(state => state.products.offer)
  const products = useSelector(state => state.products.products)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)



  const getProducts = (cparams) => dispatch(fetchProducts(cparams))


  const pagesize = 12
  const totalpages = Math.ceil(Pcount / pagesize)
  const [currentpage, setcurrentpage] = useState(1)
  const [rate, setrate] = useState()
  const [offer, setoffer] = useState()
  const [pricerange, setpricerange] = useState({})
  const [sort, setsort] = useState("newest")
  const [colors, setcolors] = useState([])
  const [brands, setbrands] = useState([])
  const [sizes, setsizes] = useState([])
  const [category, setcategory] = useState()
  const [SideDrawervisible, setSideDrawervisible] = useState(false)



  useEffect(() => {
    if (Categories) {
      setcategory(Categories.find(cat => cat._id === params.category))
    }
  }, [Categories, params.category])

  useEffect(() => {
    if (category) {
      getProducts({
        category: category._id,
        brands: brands,
        min: pricerange.min,
        max: pricerange.max,
        colors: colors,
        page: currentpage,
        pagesize,
        sort: sort,
        size: sizes,
        offer: offer,
        rate: rate
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, colors, pricerange, brands, sort, sizes, currentpage, rate, offer])

  const handleBrand = (e) => {
    brands.includes(e.target.value) ? setbrands(brands.filter(x => x !== e.target.value)) :
      setbrands([...brands, e.target.value])
    setcurrentpage(1)
  }
  const handleColor = (e) => {
    colors.includes(e.target.value) ? setcolors(colors.filter(x => x !== e.target.value)) :
      setcolors([...colors, e.target.value])
    setcurrentpage(1)
  }
  const handleSize = (e) => {
    sizes.includes(e.target.value) ? setsizes(sizes.filter(x => x !== e.target.value)) :
      setsizes([...sizes, e.target.value])
    setcurrentpage(1)
  }
  const handleRate = (e) => {
    setrate(e.target.value)
    setcurrentpage(1)
  }
  const handleoffer = (e) => {
    setoffer(e.target.value)
    setcurrentpage(1)

  }

  const handlechangeprice = (max, min) => {
    setpricerange({
      min: Math.min(min, max),
      max: Math.max(min, max)
    })
    setcurrentpage(1)

  }

  const setpage = (action) => {
    switch (action) {
      case "first": setcurrentpage(1)
        break;
      case "subone": setcurrentpage(currentpage - 1)
        break;
      case "addone": setcurrentpage(currentpage + 1)
        break;
      case "last": setcurrentpage(totalpages)
        break;
      case "subtwo": setcurrentpage(currentpage - 2)
        break;
      case "addtwo": setcurrentpage(currentpage + 2)
        break;
      default:
        setcurrentpage(currentpage)
        break;
    }

  }
  const handlesort = (orderby) => {
    setcurrentpage(1)
    switch (orderby) {
      case "newest":
        setsort("newest")
        break;
      case "priceAsc":
        setsort("priceAsc")
        break;
      case "priceDesc":
        setsort("priceDesc")
        break;
      default:
        setsort("newest")
        break;
    }
  }
  const Filters = category && products && <div className={classes.filters}>
    <CategoryFilter category={category} handleClick={()=>setcurrentpage(1)} />
    {
      Pcolors.length > 0 &&
      <ColorFilter
        checked={colors}
        colors={Pcolors}
        handlechange={handleColor} />
    }

    {
      Psizes.length > 0 && <SizeFilter
        checked={sizes}
        sizes={Psizes}
        handlechange={handleSize} />
    }

    {
      Pbrands.length > 0 && <BrandFilter
        checked={brands}
        brands={Pbrands}
        handlechange={handleBrand} />
    }

    {
      typeof (Pmin) === 'number' && <Price
        min={pricerange.min}
        max={pricerange.max}
        handlechange={handlechangeprice}
      />
    }
    {
      Prate && Prate >= 2 &&
      <RateFilter
        rate={Prate}
        checked={rate}
        setFilter={() => setrate()}
        handlechange={handleRate}
      />
    }
    {
      Poffer && Poffer >= 20 &&
      <OfferFilter
        offer={Poffer}
        checked={offer}
        setFilter={() => setoffer()}
        handlechange={handleoffer}
      />
    }</div>

  return (
    <div className={classes.category}>
      {loading ? <Bigspinner /> : error ? <p>error</p> :
        category &&
        <div className={classes.productselect}>
          <div className={classes.deskTopFilters}>
            {Filters}
          </div>
          <div className={classes.ResFilters}>
            <SideDrawer Open={SideDrawervisible}
              Header={<p>الفلتر</p>}
              close={() => setSideDrawervisible(false)}>
              {Filters}
            </SideDrawer>
          </div>
          <div className={classes.productsArea} >
            <div className={classes.productHeader}>
              <div className={classes.headertop}>
                <div className={classes.ResHeader}>
                  <h3> اشتري {category.name}
                  </h3>
                  <span onClick={() => setSideDrawervisible(true)}>الفلتر <ArrowBackIcon style={{ marginRight: '5px', fontSize: '18px' }} /> </span>
                </div>
                <Dropdown
                  orderBy={sort}
                  handelchange={handlesort}
                />
              </div>
              <p> اجمالي المنتجات {Pcount} </p>
            </div>
            {products && products.length > 0 ? < div className={classes.products}>
              {products.map(prod => <Product product={prod} key={prod._id} />)}
            </div> : <div className={classes.noProducts}><RemoveShoppingCartIcon style={{ fontSize: '100px', color: "#ededed" }} />
              <h4 >عفوا لايوجد منتجات </h4>
              < Link to="/"> تسوق </Link> </div >
            }

            {totalpages > 1 &&
              <div className={classes.pageContainer}>
                <PagePagination
                  currentpage={currentpage}
                  handlechange={setpage}
                  totalpages={totalpages} />
              </div>
            }
          </div>
        </div>
      }
    </div >
  )
}

export default Category
