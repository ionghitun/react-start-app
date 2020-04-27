import axios from 'axios';

import {setError} from "./error";
import {translate} from "../libs/translate";

export const getTranslation = (lang) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`translations/${lang}.json`);

            if (res && res.data) {
                dispatch(setTranslation(res.data));
            }
        } catch (e) {
            let error = translate('errors.application');

            dispatch(setError(error));
        }
    };
};

export const setTranslation = (payload = {}) => {
    return {
        payload,
        type: 'SET_TRANSLATION'
    };
};

export default {
    getTranslation,
    setTranslation
};
