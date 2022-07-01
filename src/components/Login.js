import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { actLogin, actFetchCart } from './../action/index'
import callApiHttp from "./utils"



function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const signin = (isAd) => dispatch(actLogin(isAd));
    const fetchCart = (products) => dispatch(actFetchCart(products));

    const notify = (string) => toast(string);

    async function SubmitForm(e) {
        var username = document.getElementById('txtUsername').value;
        var password = document.getElementById('txtPassword').value;
        if (username === "" || password === "") {
            notify("Đăng nhập thất bại")
            return
        }
        var payload = {
            "username": username,
            "password": password
        }
        try{
            const res = await callApiHttp({
                url: '/users/login',
                method: 'POST',
                data: payload
            })
            const {token} = res.data?.data
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(true));
            var admin = (username === 'admin' && password === "admin123456")
            localStorage.setItem('admin', JSON.stringify(admin));
            if (admin) signin(admin);
            signin(false);

            const response_cart = await callApiHttp({
                url: '/users/cart',
                method: 'GET'
            })
            const products = response_cart?.data?.data?.details
            console.log(products)
            fetchCart(products)

            notify("Đăng nhập thành công!!")

            history.push('/')
        }catch(e){
            console.log("e", e)
            let err = e?.response?.data?.data
            let errText = 'Đăng nhập thất bại'
            if(typeof(err) === 'object'){
                errText = ''
                for ( let key in err){
                    errText += `${key} : ${err[key]} \n`
                }
            }
            notify(errText)
        }
    }

    return (
        <div className="top-bar">
            <div className="container">
                <div className="row" >
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 center-block">

                            <legend>Đăng nhập</legend>

                            <div className="form-group text-left">
                                <label >Username</label>
                                <input type="text" className="form-control" id="txtUsername" placeholder="Nhập username" />
                            </div>

                            <div className="form-group text-left">
                                <label >Password</label>
                                <input type="password" className="form-control" id="txtPassword" placeholder="Nhập password" />
                            </div>

                            <button type="submit" onClick={SubmitForm} className="btn btn-primary center-block">Submit</button>

                            <ToastContainer autoClose={1000}/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
