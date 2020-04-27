import http from '../libs/http';

import {setError} from "./error";
import {translate} from "../libs/translate";

export const getLanguages = () => {
    return async (dispatch) => {
        try {
            const res = await http.route('languages').get();

            if (!res.isError) {
                dispatch(setLanguages(res.data));
            } else {
                let error = translate('errors.application');

                dispatch(setError(error));
            }
        } catch (e) {
            let error = translate('errors.application');

            dispatch(setError(error));
        }
    };
};

export const setLanguages = (payload) => {
    return {
        payload,
        type: 'SET_LANGUAGES'
    };
};

export default {
    getLanguages,
    setLanguages
};
