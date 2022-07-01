import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actDeleteAllInCart, actToast } from './../action/index'
import { useDispatch } from 'react-redux';
import callApiHttp from "./utils"


CartResut.propTypes = {
  cart: PropTypes.array,
};

CartResut.defaultProps = {
  cart: null,
};


function CartResut(props) {
  let history = useHistory();
  const toastLocal = (message) => dispatch(actToast(message));
  var { cart } = props;

  const [fee, setFee] = React.useState({
    perCentOrder: 0,
    ceilingPrice: 0
  })

  React.useEffect(()=> {
      const getFee = async () => {
        try{
          const res = await callApiHttp({
            url: '/orders/fee',
            method: 'GET'
          })
          const data = res?.data?.data;
          setFee({
            perCentOrder: data.per_cent_order,
            ceilingPrice: data.ceiling_price
          })
        }catch(e){}
      }
      getFee();
  }, [])

  const notify = (notification) => toast(notification);
  const dispatch = useDispatch();
  const deleteAll = () => dispatch(actDeleteAllInCart());

  async function order() {
    // var data = JSON.parse(localStorage.getItem('cart'));
    // var token = JSON.parse(localStorage.getItem('token'));

    // var apiBaseUrl = "http://localhost:8081/broken";
    // var payload = [];
    // for (var i = 0; i < data.length; i++) {
    //   payload.push({
    //     "quantity": data[i].quantity,
    //     "product": { "id": data[0].product['id'] }
    //   });
    // }
    // axios.post(
    //   apiBaseUrl,
    //   payload,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   }).then(function (response) {
    //     alert("Bạn đã mua sản phẩm thành công!")
    //     localStorage.removeItem("cart");
    //     deleteAll()
    //     history.push('/')
    //   })
    //   .catch(function (error) {
    //     if (error.response.status === 401 && !token)
    //       notify("No Login! Try Login");
    //     else
    //       notify("Error Server!! Cannot purchase now");
    //   });

    // var payload = [];
    // for (var i = 0; i < cart.length; i++) {
    //   payload.push({
    //     "quantity": cart[i].quantity,
    //     "product_id": cart[i].product.id
    //   });
    // }

    // try{
    //   const res = await callApiHttp({
    //     url: '/orders',
    //     method: 'POST',
    //     data: {
    //       details: payload
    //     }
    //   })
    //   console.log(res)


      // localStorage.removeItem("cart");
      // deleteAll()
      // history.push('/')
    // }catch(e){
    //   let err = e?.response?.data?.data
    //   let errText = 'Error Server!! Cannot purchase now'
    //   if(typeof(err) === 'object'){
    //       errText = ''
    //       for ( let key in err){
    //           errText += `${key} : ${err[key]} \n`
    //       }
    //   }
    //   toastLocal(errText)
    // }
    history.push('/order')
  }

  function showTotalAmount(cart) {
    var total = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        if(cart[i].isPayment)
          total += cart[i].product.price * cart[i].quantity;
      }
    }

    return total;
  }

  return (
    <tr>
      <td colSpan="3"></td>
      <td>
        <h4>
          <strong>Tổng Tiền</strong>
        </h4>
      </td>
      <td>
        <h4>
          <strong>{showTotalAmount(cart)} đồng</strong>
        </h4>
      </td>
      <td colSpan="3">
        <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
          onClick={order}
        >
          Đặt Hàng
        </button>
        <ToastContainer autoClose={1000}/>
      </td>
    </tr>
  );
}

export default CartResut;
