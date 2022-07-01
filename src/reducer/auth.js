import * as Types from '../constants/ActionType';
var token = JSON.parse(localStorage.getItem('token'));
var initialState = token !== null;

const auth = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGOUT:
            localStorage.removeItem('token');
            localStorage.setItem('admin', JSON.stringify(false));
            localStorage.removeItem('cart');
            return false
        case Types.LOGIN:
            return true
        default: return state;
    }
}

export default auth;