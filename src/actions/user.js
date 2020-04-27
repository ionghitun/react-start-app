import http from '../libs/http';

import {setError} from "./error";
import {translate} from "../libs/translate";

export const loginUser = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.route('login').post({...payload});

            if (!res.isError) {
                sessionStorage.setItem('token', res.data.token);

                if (payload.hasOwnProperty('remember') && payload.remember && res.data.hasOwnProperty('rememberToken')) {
                    localStorage.setItem('rememberToken', res.data.rememberToken);
                }

                dispatch(setUser(res.data.user));
                dispatch(setUserErrors(false));
                dispatch(setLoading(false));
            } else {
                dispatch(setUserErrors(res.errorMessages));
            }
        } catch (e) {
            let error = translate('errors.application');

            dispatch(setError(error));
        }
    };
};

export const loginWithRememberToken = (payload = {}) => {
    return async (dispatch) => {
        try {
            const res = await http.route('login-token').post({...payload});

            if (!res.isError) {
                sessionStorage.setItem('token', res.data.token);

                dispatch(setUser(res.data.user));
                dispatch(setUserErrors(false));
                dispatch(setLoading(false));
            } else {
                localStorage.removeItem('rememberToken');
                window.location.reload();
            }
        } catch (e) {
            let error = translate('errors.application');

            dispatch(setError(error));
        }
    };
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            const rememberToken = localStorage.getItem('rememberToken');

            let logoutParams = {};

            if (rememberToken) {
                logoutParams = Object.assign({}, {rememberToken});
            }

            const res = await http.route('logout').post(logoutParams, true);

            if (!res.isError) {
                sessionStorage.clear();
                localStorage.removeItem('rememberToken');
                dispatch(setUser(false));
            } else {
                dispatch(setUserErrors(res.errorMessages));
            }
        } catch (e) {
            let error = translate('errors.application');

            dispatch(setError(error));
        }
    };
};

export const setUser = (payload) => {
    return {
        payload,
        type: 'SET_USER'
    };
};

export const getUser = () => {
    return async (dispatch) => {
        try {
            const res = await http.route('user').get();

            if (!res.isError) {
                sessionStorage.setItem('token', res.data.token);

                dispatch(setUser(res.data.user));
                dispatch(setUserErrors(false));
                dispatch(setLoading(false));
            } else {
                sessionStorage.clear();
                window.location.reload();
            }
        } catch (e) {
            let error = translate('errors.application');

            dispatch(setError(error));
        }
    };
};

export const setUserErrors = (payload) => {
    return {
        payload,
        type: 'SET_USER_ERRORS'
    };
};

export const setLoading = (payload) => {
    return {
        payload,
        type: 'SET_LOADING'
    };
};

export default {
    loginUser,
    loginWithRememberToken,
    logoutUser,
    setUser,
    getUser,
    setUserErrors,
    setLoading
};
