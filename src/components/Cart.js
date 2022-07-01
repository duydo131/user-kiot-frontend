import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem'
import CartResult from './CartResult'
import * as Message from './../constants/Message';
import { actDeleteProductInCart, actChangeMessage, actUpdateProductInCart, actUpdateStatusPaymentInCart } from './../action/index'

function Cart(props) {

  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const onDeleteProductInCart = (product) => dispatch(actDeleteProductInCart(product));
  const onUpdateStatusPaymentInCart = (product) => dispatch(actUpdateStatusPaymentInCart(product));
  const onChangeMessage = (message) => dispatch(actChangeMessage(message));
  const onUpdateProductInCart = (message, quantity) => dispatch(actUpdateProductInCart(message, quantity));

  function showCartItem(cart) {
    var result = <tr>
      <td>{Message.MSG_CART_EMPTY}</td>
    </tr>;
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return (
          <CartItem
            key={index}
            item={item}
            index={index}
            onDeleteProductInCart={onDeleteProductInCart}
            onChangeMessage={onChangeMessage}
            onUpdateProductInCart={onUpdateProductInCart}
            onUpdateStatusPaymentInCart={onUpdateStatusPaymentInCart}
          />
        );
      });
    }
    return result;
  }

  function showTotalAmount(cart) {
    var result = null;
    if (cart.length > 0) {
      result = <CartResult cart={cart} />
    }
    return result;
  }

  return (
    <section className="section" style={{marginTop:"2%"}}>
      <h4 style={{textAlign: "center"}}>
        <strong>Thông tin giỏ hàng</strong>
      </h4>
      <div className="table-responsive">
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
            {showCartItem(cart)}
            {showTotalAmount(cart)}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Cart;
