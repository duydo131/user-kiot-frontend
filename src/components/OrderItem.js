import React from 'react';
import PropTypes from 'prop-types';
import * as Message from '../constants/Message'
import callApiHttp from "./utils"
import { useDispatch } from 'react-redux';
import { actToast } from '../action/index'


OrderItem.propTypes = {
  item: PropTypes.object,
  onUpdateProductInOrder: PropTypes.func,
  onDeleteProductInOrder: PropTypes.func,
};

OrderItem.defaultProps = {
  item: null,
  onUpdateProductInOrder: null,
  onDeleteProductInOrder: null,
};

function OrderItem(props) {
  var { 
    item,
    onUpdateProductInOrder,
    onDeleteProductInOrder
  } = props;
  const dispatch = useDispatch();
  const toastLocal = (message) => dispatch(actToast(message));


  function totalAmount(price, quantity) {
    return price * quantity;
  }

  function onDelete(product) {
    onDeleteProductInOrder(product)
  }

  function onUpdateQuantity(product, quantity) {
    if (quantity > 0) {
      onUpdateProductInOrder(product, quantity);
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

export default OrderItem;
