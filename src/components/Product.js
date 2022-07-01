import React from 'react';
import PropTypes from 'prop-types';
import * as Message from './../constants/Message'
import {DEFAULT_IMAGE_PRODUCT} from './../constants/httpContants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApiHttp from "./utils"
import { useDispatch, useSelector } from 'react-redux';
import { actRemoveCartByOrder, actEnableToast, actToast} from '../action/index'


Product.propTypes = {
  product: PropTypes.object,
  onAddToCart: PropTypes.func,
  onChangeMessage: PropTypes.func,
};

Product.defaultProps = {
  product: null,
  onAddToCart: null,
  onChangeMessage: null,
};


function Product(props) {
  const dispatch = useDispatch();
  const toastCore = (message) => dispatch(actEnableToast(message));

  const notify = () => toastCore("Thêm thành công vào giỏ hàng!");

  const { product, onAddToCart, onChangeMessage } = props;

  function showRatings(rating) {
    if(typeof(rating) !== 'number') return
    var result = [];
    for (var i = 1; i <= rating; i++) {
      result.push(<i key={i} className="fa fa-star"></i>);
    }
    for (var j = 1; j <= (5 - rating); j++) {
      result.push(<i key={i + j} className="fa fa-star-o"></i>);
    }
    return result;
  }

  const addCartProductToServer = async (product) => {
      return await callApiHttp({
        url: 'users/update_cart',
        method: 'POST',
        data: {
          'products': [
            {
              'product_id': product.id,
              'quantity': 1
            }
          ]
        }
      })
  }

  function onAddToCart1(product) {
    Promise.all(addCartProductToServer(product)).catch(e => {
      let err = e?.response?.data?.data
      let errText = 'Không thêm được sản phâm'
      if(typeof(err) === 'object'){
          errText = ''
          for ( let key in err){
              errText += `${key} : ${err[key]} \n`
          }
      }
      notify(errText)
    })
    onAddToCart(product);
    onChangeMessage(Message.MSG_ADD_TO_CART);
    notify()
  }
  

  return (
    <div className="col-lg-4 col-md-6 mb-r">
      <div className="card text-center card-cascade narrower">
        <div className="view overlay hm-white-slight z-depth-1" width="322" height="224" >
          <img src={product.image || DEFAULT_IMAGE_PRODUCT}
            className="img-fluid" alt={product.name}/>
          <a>
            <div className="mask waves-light waves-effect waves-light"></div>
          </a>
        </div>
        <div className="card-body">
          <h4 className="card-title">
            <strong>
              <a>{product.name}</a>
            </strong>
          </h4>
          <ul className="rating">
            <li>
              {showRatings(product.rating)}
            </li>
          </ul>
          <p className="card-text">
            {product.description}
          </p>
          <div className="card-footer">
            <span className="left">{product.price} đồng</span>
            <span className="right">
              <a
                className="btn-floating blue-gradient"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="Add to Cart"
                onClick={() => onAddToCart1(product)}
              >
                <i className="fa fa-shopping-cart"></i>
              </a>
              <ToastContainer autoClose={1000}/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
