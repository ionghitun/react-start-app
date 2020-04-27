import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import userActions from "../../actions/user";

export const AccountWrapper = (WrappedComponent, needsLogin) => {
    const mapStateToProps = function (store) {
        return {
            user: store.user.user,
            loading: store.user.loading
        };
    };

    const mapDispatchToProps = dispatch => {
        return bindActionCreators({...userActions}, dispatch);
    };

    function ProtectedWrapper(props) {
        useEffect(() => {
            const rememberToken = localStorage.getItem('rememberToken');

            const token = sessionStorage.getItem('token');

            if (props.user && !token) {
                if (rememberToken) {
                    const {loginWithRememberToken} = props;

                    let credentials = {
                        rememberToken
                    };

                    loginWithRememberToken(credentials);
                } else {
                    sessionStorage.clear();
                    props.history.push("/login");
                }
            } else {
                if (!props.user && token) {
                    const {getUser} = props;

                    getUser();
                } else if (!props.user && rememberToken) {
                    const {loginWithRememberToken} = props;

                    let credentials = {
                        rememberToken
                    };

                    loginWithRememberToken(credentials);
                } else if (needsLogin && !token && props.location.pathname !== '/login') {
                    props.history.push("/login");
                }
            }
        }, [props]);

        if (needsLogin) {
            const {loading} = props;

            if (loading) {
                return null;
            }
        }

        return <WrappedComponent {...props}/>;
    }

    return connect(mapStateToProps, mapDispatchToProps)(ProtectedWrapper);
};
