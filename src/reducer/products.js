import * as Types from './../constants/ActionType';

var initialState = [];

const products = (state = initialState, action) => {
    var { products } = action;
    switch (action.type) {
        case Types.FETCH_PRODUCT:
            state = [...products]
            return [...state];
        default: return [...state];
    }
}

export default products;