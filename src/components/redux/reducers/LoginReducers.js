import LoginActionTypes from '../actionTypes/LoginActionTypes';

const INITIAL_STATE = {
    user: null,
    error: '',
    loading: false,
    isUserLogIn: false,
}

export default (state = INITIAL_STATE, action) => {
    console.log("loginpage>>>>", "loginUser post", action);
    switch (action.type) {
        case LoginActionTypes.ON_LOGIN_REQUEST_START:
            return { ...state, loading: true, isUserLogIn: false }
        case LoginActionTypes.ON_LOGIN_REQUEST_SUCCESS:
            return { ...state, loading: false, user: action.payload, isUserLogIn: true }
        case LoginActionTypes.ON_LOGIN_REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload, isUserLogIn: false }
        case LoginActionTypes.ON_LOGIN_FORM_CLEAR:
            return { ...state, ...INITIAL_STATE, user: action.payload, error: '' }
        default: return state;
    }
}