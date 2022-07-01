import * as Types from '../constants/ActionType';

var initialState = {
    handlerId: "",
    amount: 0,
    type: 'ORDER',
    payload: {}
};

const payment = (state = initialState, action) => {
    switch (action.type) {
        case Types.PAYMENT:
            return action.infoPayment;
        default: return state;
    }
}

export default payment;