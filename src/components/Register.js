import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApiHttp from "./utils"
import { useDispatch } from 'react-redux';
import { actToast } from './../action/index'


function Signup() {
    let history = useHistory();
    const dispatch = useDispatch();
    const toastLocal = (message) => dispatch(actToast(message));

    async function SignupHandle(e) {
        var email = document.getElementById('txtEmail').value;
        var username = document.getElementById('txtUsername').value;
        var password = document.getElementById('txtPassword').value;
        var confirmPassword = document.getElementById('txtConfirmPassword').value;
        if (password !== confirmPassword) {
            alert("Password is invalid")
            return
        }
        var payload = {
            "email": email,
            "username": username,
            "password": password,
            "role": "USER"
        }

        try{
            const res = await callApiHttp({
                url: '/users/register',
                method: 'POST',
                data: payload
            })
            history.push('/signin')
            toastLocal("Đăng kí thành công!!")
        }catch(e){
            let err = e?.response?.data?.data
            let errText = 'cannot register user'
            if(typeof(err) === 'object'){
                errText = ''
                for ( let key in err){
                    errText += `${key} : ${err[key]} \n`
                }
            }
            toastLocal(errText)
        }
    }

    return (
        <div className="top-bar">
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center center-block">
                    <div className="form-group text-left">
                        <label>Email</label>
                        <input type="text"
                            className="form-control"
                            id="txtEmail"
                            placeholder="email"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label>Username</label>
                        <input type="text"
                            className="form-control"
                            id="txtUsername"
                            placeholder="username"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label>Password</label>
                        <input type="password"
                            className="form-control"
                            id="txtPassword"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label >Confirm Password</label>
                        <input type="password"
                            className="form-control"
                            id="txtConfirmPassword"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary center-block"
                        onClick={SignupHandle}
                    >
                        Register
                </button>
                    <ToastContainer autoClose={1000}/>
            </div>
        </div>
    );
}

export default Signup;
