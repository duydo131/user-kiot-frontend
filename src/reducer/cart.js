import * as Types from './../constants/ActionType';
var data = JSON.parse(localStorage.getItem('cart'));
var initialState = data ? data : [];

const cart = (state = initialState, action) => {
    var { product, quantity } = action;
    var index = -1;
    switch (action.type) {
        case Types.ADD_TO_CART:
            index = findProductInCart(state, product.id);
            if (index !== -1) {
                state[index].quantity += quantity;
            } else {
                state.push({
                    product,
                    quantity,
                    isPayment: false,
                });
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case Types.DELETE_PRODUCT_IN_CART:
            index = findProductInCart(state, product.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case Types.DELETE_ALL_IN_CART:
            return [];
        case Types.UPDATE_PRODUCT_IN_CART:
            index = findProductInCart(state, product.id);
            if (index !== -1) {
                state[index].quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case Types.UPDATE_PAYMENT_STATUS:
            index = findProductInCart(state, product.id);
            if (index !== -1) {
                state[index].isPayment = !state[index].isPayment;
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return [...state];
        case Types.FETCH_CART:
            const cart = []
            for(let i = 0; i < product.length; i++){
                cart.push({
                    product: product[i].product,
                    quantity: product[i].quantity,
                    isPayment: false,
                })
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            state = [...cart]
            return [...state];
        case Types.DELETE_PRODUCT_IN_CART_BY_ORDER:
            let new_cart = [...state]
            for(let i = 0; i < product.length; i++){
                index = findProductInCart(new_cart, product[i].product_id);
                if (index !== -1) {
                    new_cart.splice(index, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(new_cart));
            return [...new_cart];
        default: return [...state];
    }
}

var findProductInCart = (cart, product_id) => {
    var index = -1;
    console.log("cart", cart)
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.id === product_id) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export default cart;