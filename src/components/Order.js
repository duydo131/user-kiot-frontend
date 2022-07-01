import { useDispatch, useSelector } from 'react-redux';
import OrderItem from './OrderItem'
import CartResult from './CartResult'
import * as Message from '../constants/Message';
import { actDeleteProductInCart, actChangeMessage, actUpdateProductInCart, actUpdateStatusPaymentInCart } from '../action/index'
import React from 'react';
import OrderResult from './OrderResult';


var findProductInOrder = (orders, product) => {
  var index = -1;
  if (orders.length > 0) {
      for (var i = 0; i < orders.length; i++) {
          if (orders[i].product.id === product.id) {
              index = i;
              break;
          }
      }
  }
  return index;
}

function Order(props) {
  const [orders, setOrders] = React.useState([])

  const cart = useSelector(state => state.cart);

  React.useEffect(()=> {
    setOrders(cart.filter(item => item.isPayment));
  }, [])

  const onDeleteProductInOrder = (product) => {
    let index = findProductInOrder(orders, product);
    let new_orders = [...orders]
    if (index !== -1) {
      new_orders.splice(index, 1);
    }
    setOrders(new_orders)
  }

  const onUpdateProductInOrder = (product, quantity) => {
    let index = findProductInOrder(orders, product);
    let new_orders = [...orders]
    if (index !== -1) {
      new_orders[index].quantity = quantity;
    }
    setOrders(new_orders);
  }

  function showOrderItem(orders) {
    var result = <tr>
      <td>{Message.MSG_CART_EMPTY}</td>
    </tr>;
    if (orders.length > 0) {
      result = orders.map((item, index) => {
        return (
          <OrderItem
            key={index}
            item={item}
            index={index}
            onDeleteProductInOrder={onDeleteProductInOrder}
            onUpdateProductInOrder={onUpdateProductInOrder}
          />
        );
      });
    }
    return result;
  }

  function showTotalAmount(orders) {
    var result = null;
    if (orders.length > 0) {
      result = <OrderResult orders={orders} />
    }
    return result;
  }

  return (
    <section className="section" style={{marginTop:"8%"}}>
      <div className="table-responsive">
      <h4 style={{textAlign: "center"}}>
        <strong>Thông tin đơn hàng</strong>
      </h4>
        <table className="table product-table">
          <thead>
            <tr>
              <th></th>
              <th>Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Tổng Cộng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {showOrderItem(orders)}
            {showTotalAmount(orders)}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Order;
