import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import message from './message';
import auth from './auth';
import admin from './admin';
import payment from './payment';
import toast from './toast';

const appReducers = combineReducers({
    products,
    cart,
    message,
    auth,
    admin,
    toast,
    payment,
});

export default appReducers;