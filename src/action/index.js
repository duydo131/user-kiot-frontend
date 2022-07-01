import * as Types from './../constants/ActionType';

export const actAddToCart = (product, quantity) => {
    return {
        type: Types.ADD_TO_CART,
        product,
        quantity
    }
}

export const actChangeMessage = (message) => {
    return {
        type: Types.CHANGE_MESSAGE,
        message
    }
}

export const actDeleteProductInCart = (product) => {
    return {
        type: Types.DELETE_PRODUCT_IN_CART,
        product
    }
}

export const actDeleteAllInCart = () => {
    return {
        type: Types.DELETE_ALL_IN_CART,
    }
}

export const actUpdateProductInCart = (product, quantity) => {
    return {
        type: Types.UPDATE_PRODUCT_IN_CART,
        product,
        quantity
    }
}

export const actUpdateStatusPaymentInCart = (product) => {
    return {
        type: Types.UPDATE_PAYMENT_STATUS,
        product,
    }
}

export const actFetchCart = (products) => {
    return {
        type: Types.FETCH_CART,
        product: products
    }
}

export const actRemoveCartByOrder = (products) => {
    return {
        type: Types.DELETE_PRODUCT_IN_CART_BY_ORDER,
        product: products
    }
}

export const actFetchProduct = (products) => {
    return {
        type: Types.FETCH_PRODUCT,
        products
    }
}

export const actLogin = (isAd) => {
    if (isAd) {
        return {
            type: Types.LOGIN_ADMIN,
        }
    }
    return {
        type: Types.LOGIN,
    }
}

export const actLogout = () => {
    return {
        type: Types.LOGOUT,
    }
}

export const actToast = (message) => {
    return {
        type: Types.TOAST,
        message
    }
}

export const actPayment = (handlerId, amount, type, payload) => {
    return {
        type: Types.PAYMENT,
        infoPayment: {
            'handler_id': handlerId,
            amount,
            type,
            payload
        }
    }
}

export const actEnableToast = (message) => {
    return {
        type: Types.ENABLE_TOAST,
        message: message,
    }
}

export const actDisableToast = () => {
    return {
        type: Types.DISABLE_TOAST,
    }
}