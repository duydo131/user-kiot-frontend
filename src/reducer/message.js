import * as Message from './../constants/Message';
import * as Types from './../constants/ActionType';

var initialState = Message.MSG_WELCOME;

const message = (state = initialState, action) => {
    var { message } = action;
    switch (action.type) {
        case Types.CHANGE_MESSAGE:
            state = message
            return state;
        default: return state;
    }
}

export default message;