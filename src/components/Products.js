import { useDispatch, useSelector } from 'react-redux';
import Product from './Product'
import { actAddToCart, actChangeMessage, actFetchProduct } from './../action/index'
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';
import callApiHttp from "./utils"
import {LOGO_LOCAL} from './../constants/httpContants'


Products.propTypes = {

};

function Products(props) {
  const [productsAPI, setProductAPI] = useState([]);
  const [txtSearch, setSearch] = useState("")
  const [filter, setFilter] = useState({
    page: 1,
  })

  async function fetchProduct() {
    try{
      const res = await callApiHttp({
        url: '/products',
        method: 'GET',
        params: filter,
      })
      const products = res?.data?.data?.results;
      setProductAPI(products)
    }catch(error){console.log(error)}
  }

  useEffect(() => {
    fetchProduct();
  }, [filter]);

  const dispatch = useDispatch();
  const onAddToCart = (product) => dispatch(actAddToCart(product, 1));
  const onChangeMessage = (message) => dispatch(actChangeMessage(message));

  const onFetchProduct = (productsAPI) => dispatch(actFetchProduct(productsAPI));
  onFetchProduct(productsAPI);

  const searchHandler = () => {
    setFilter({
      ...filter, 
      name: txtSearch
    })
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <section className="section">
      {/* <h1 className="section-heading">Danh Sách Sản Phẩm</h1> */}
      <div class="input-group rounded" style={{marginBottom:'5%'}}>
        <div style={{width: '17%', marginRight: '25%'}}>
          <img src={LOGO_LOCAL}/>
        </div>
        <input type="search" class="form-control rounded" placeholder="Search" value={txtSearch} onChange={onSearchChange}/>
        <span class="input-group-text border-0" id="search-addon">
          <SearchIcon 
            style={{textAlign: 'center', marginTop: '70%', cursor:'pointer'}}
            onClick={searchHandler}
          />
        </span>
      </div>
      <div className="row">
        {productsAPI.map((product, index) => {
          return <Product
            key={index}
            product={product}
            onAddToCart={onAddToCart}
            onChangeMessage={onChangeMessage}
          />
        })}
      </div>
    </section>
  )
}

export default Products;
