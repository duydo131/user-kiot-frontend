import React from 'react';
import PropTypes from 'prop-types';
import * as Message from './../constants/Message'
import callApiHttp from "./utils"
import { useDispatch } from 'react-redux';
import { actToast } from './../action/index'


CartItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  onDeleteProductInCart: PropTypes.func,
  onChangeMessage: PropTypes.func,
  onUpdateProductInCart: PropTypes.func,
  onUpdateStatusPaymentInCart: PropTypes.func,
};

CartItem.defaultProps = {
  index: 0,
  item: null,
  onDeleteProductInCart: null,
  onChangeMessage: null,
  onUpdateProductInCart: null,
  onUpdateStatusPaymentInCart: null,
};

function CartItem(props) {
  var { index, item , onUpdateStatusPaymentInCart} = props;
  const dispatch = useDispatch();
  const toastLocal = (message) => dispatch(actToast(message));


  function totalAmount(price, quantity) {
    return price * quantity;
  }

  const deleteProductInServer = async (product) => {
    return await callApiHttp({
      url: 'users/delete_product',
      method: 'POST',
      data: {
        'product_id': product.id
      }
    })
  }

  function onDelete(product) {
    Promise.all(deleteProductInServer(product)).catch(e => {
      let err = e?.response?.data?.data
      let errText = 'Không xóa được sản phẩm trong giỏ hàng'
      if(typeof(err) === 'object'){
          errText = ''
          for ( let key in err){
              errText += `${key} : ${err[key]} \n`
          }
      }
      toastLocal(errText)
    })
    var { onDeleteProductInCart, onChangeMessage } = props;
    onDeleteProductInCart(product);
    onChangeMessage(Message.MSG_DELETE_CART_SUCCESS);
  }

  function onUpdateQuantity(product, quantity) {
    if (quantity > 0) {
      var { onUpdateProductInCart, onChangeMessage } = props;
      onUpdateProductInCart(product, quantity);
      onChangeMessage(Message.MSG_UPDATE_CART_SUCCESS);
    }
  }

  return (
    <tr>
      <th scope="row">
        <img src={item.product.image}
          alt="" className="img-fluid z-depth-0" />
      </th>
      <td>
        <h5>
          <strong>{item.product.name}</strong>
        </h5>
      </td>
      <td>{item.product.price} đồng</td>
      <td className="center-on-small-only">
        <span className="qty">{item.quantity} </span>
        <div className="btn-group radio-group" data-toggle="buttons">
          <label
            onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
            className="btn btn-sm btn-primary btn-rounded waves-effect waves-light">
            <a>—</a>
          </label>
          <label
            onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
            className="btn btn-sm btn-primary btn-rounded waves-effect waves-light">
            <a>+</a>
          </label>
        </div>
      </td>
      <td>{totalAmount(item.product.price, item.quantity)} đồng</td>
      <td>
        <div class="form-check">
          <input 
            checked={item.isPayment}
            class="form-check-input" 
            type="checkbox" 
            value="" 
            id={`${index}`} 
            onClick={() => onUpdateStatusPaymentInCart(item.product)}
          />
          <label class="form-check-label" for={`${index}`}>
            Đặt hàng
          </label>
        </div>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-primary waves-effect waves-light"
          data-toggle="tooltip"
          data-placement="top"
          title=""
          data-original-title="Remove item"
          onClick={() => onDelete(item.product)}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
