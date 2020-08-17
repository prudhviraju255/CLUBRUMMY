import LoginActionTypes from '../actionTypes/LoginActionTypes';
import axios from "axios";
import ServiceUrls from '../../helpers/ServiceUrls';

export const loginUser = (user) => {
    return dispatch => {
        dispatch(loginrequeststarted());
        axios.post(ServiceUrls.USER_LOGIN, user)
            .then(res => {
                let resCode = res.data.code;

                if (resCode === 200) {
                    dispatch(loginrequestSuccess(res.data));
                } else {
                    dispatch(loginrequestFailure(res.data.message));
                }

            })
            .catch(err => {
                dispatch(loginrequestFailure(err.message));
            });
    };
}

export const adminlogin = (user) => {
    return dispatch => {
        dispatch(loginrequeststarted());
        axios.post(ServiceUrls.ADMIN_LOGIN, user)
            .then(res => {
                let resCode = res.data.code;

                if (resCode === 200) {
                    dispatch(loginrequestSuccess(res.data));
                } else {
                    dispatch(loginrequestFailure(res.data.message));
                }

            })
            .catch(err => {
                dispatch(loginrequestFailure(err.message));
            });
    };
}

export const superAdminlogin = (user) => {
    return dispatch => {
        dispatch(loginrequeststarted());
        axios.post(ServiceUrls.SUPER_ADMIN_LOGIN, user)
            .then(res => {
                let resCode = res.data.code;

                if (resCode === 200) {
                    dispatch(loginrequestSuccess(res.data));
                } else {
                    dispatch(loginrequestFailure(res.data.message));
                }

            })
            .catch(err => {
                dispatch(loginrequestFailure(err.message));
            });
    };
}

export const userdetails = (user) => {
    return dispatch => {
        setuserdetails(user);
    };
}

const loginrequeststarted = () => ({
    type: LoginActionTypes.ON_LOGIN_REQUEST_START
});
const loginrequestSuccess = (data) => ({
    type: LoginActionTypes.ON_LOGIN_REQUEST_SUCCESS,
    payload: data
});

const setuserdetails = (data) => ({
    type: LoginActionTypes.SET_USER_INFO,
    payload: data
});



const loginrequestFailure = (data) => ({
    type: LoginActionTypes.ON_LOGIN_REQUEST_FAIL,
    payload: data
});
