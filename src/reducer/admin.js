import * as Types from '../constants/ActionType';
var isAdmin = JSON.parse(localStorage.getItem('admin'));
var initialState = isAdmin;

const admin = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGOUT:
            localStorage.removeItem('token');
            localStorage.setItem('admin', JSON.stringify(false));
            localStorage.removeItem('cart');
            return false
        case Types.LOGIN_ADMIN:
            return true
        default: return state;
    }
}

export default admin;