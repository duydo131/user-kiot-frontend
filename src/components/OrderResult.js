import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actPayment, actToast } from '../action/index'
import { useDispatch } from 'react-redux';
import callApiHttp from "./utils"


OrderResult.propTypes = {
  orders: PropTypes.array,
};

OrderResult.defaultProps = {
  orders: null,
};


function OrderResult(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  const toastLocal = (message) => dispatch(actToast(message));
  const infoPayment = (handlerId, amount, type, payload) => dispatch(actPayment(handlerId, amount, type, payload));

  var { orders } = props;

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

  // const notify = (notification) => toast(notification);
  // const dispatch = useDispatch();
  // const deleteAll = () => dispatch(actDeleteAllInCart());

  async function postBroken() {
    var payload = [];
    for (var i = 0; i < orders.length; i++) {
      payload.push({
        "quantity": orders[i].quantity,
        "product_id": orders[i].product.id
      });
    }

    try{
      const res = await callApiHttp({
        url: '/orders',
        method: 'POST',
        data: {
          details: payload
        }
      })
      const {data} = res?.data
      infoPayment(data.id, data.total_price, 'ORDER', payload)
      history.push('/payment')
    }catch(e){
      let err = e?.response?.data?.data
      let errText = 'Error Server!! Cannot purchase now'
      if(typeof(err) === 'object'){
          errText = ''
          for ( let key in err){
              errText += `${key} : ${err[key]} \n`
          }
      }
      toastLocal(errText)
    }
  }

  function showTotalAmount(orders) {
    var total = 0;
    if (orders.length > 0) {
      for (var i = 0; i < orders.length; i++) {
        if(orders[i].isPayment)
          total += orders[i].product.price * orders[i].quantity;
      }
    }
    let feeOrder = total * fee.perCentOrder / 100

    return total + Math.floor(Math.min(feeOrder, fee.ceilingPrice) / 100) * 100;
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
          <strong>{showTotalAmount(orders)} đồng</strong>
        </h4>
      </td>
      <td colSpan="3">
        <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
          onClick={postBroken}
        >
          Thanh toán
        </button>
        <ToastContainer autoClose={1000}/>
      </td>
    </tr>
  );
}

export default OrderResult;
