import React from 'react';
import Layout from "../Layout/Layout";
import {bindActionCreators} from "redux";

import userActions from "../../actions/user";
import {connect} from "react-redux";

const mapStateToProps = function (store) {
    return {
        user: store.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({...userActions}, dispatch);
};

function Profile(props) {
    const {user} = props;

    return <Layout>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role_id}</div>
    </Layout>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
