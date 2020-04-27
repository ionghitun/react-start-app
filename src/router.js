import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {AccountWrapper} from './components/Helpers/AccountWrapper';

import Home from './components/Home';
import Profile from './components/Account';
import Logout from './components/Auth/Logout';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import Register from './components/Auth/Register';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment";
import store from "./store";
import {getTranslation} from "./actions/translation";

const mapStateToProps = function (store) {
    return {
        languages: store.languages,
        translation: store.translation,
        error: store.error
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

function Router(props) {
    useEffect(() => {
        const lang = localStorage.getItem('lang') || process.env.REACT_APP_DEFAULT_LANG;

        moment.locale(lang);

        store.dispatch(getTranslation(lang));
    }, []);

    const {error} = props;

    if (error) {
        return <div>{error}</div>
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={AccountWrapper(Login, false)}/>
                <Route exact path="/forgot-password" component={AccountWrapper(ForgotPassword, false)}/>
                <Route exact path="/register" component={AccountWrapper(Register, false)}/>

                <Route exact path="/" component={AccountWrapper(Home, false)}/>
                <Route exact path="/profile" component={AccountWrapper(Profile, true)}/>

                <Route exact path="/logout" component={AccountWrapper(Logout, true)}/>
            </Switch>
        </BrowserRouter>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
