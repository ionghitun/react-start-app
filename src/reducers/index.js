import {combineReducers} from 'redux';

import responsive from './responsive';
import user from './user';
import translation from './translation';
import error from './error';
import languages from './languages';
import redirectAfterLogin from './redirectAfterLogin';

const reducers = {
    responsive,
    user,
    translation,
    error,
    languages,
    redirectAfterLogin
};

export default combineReducers(reducers);
