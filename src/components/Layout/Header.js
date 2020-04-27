import React, {Fragment} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {translate} from "../../libs/translate";

const mapStateToProps = function (store) {
    return {
        user: store.user.user,
        translation: store.translation
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

function Header(props) {
    const {user} = props;

    return (
        <header className={'header'}>
            <Link to={'/'}>{translate('header.home')}</Link> | {user && <Fragment>
            <Link to={'profile'}>{translate('header.profile')}</Link> | <Link
            to={'logout'}>{translate('header.logout')}</Link>
        </Fragment>} {!user && <Fragment>
            <Link to={'login'}>{translate('header.login')}</Link> | <Link
            to={'register'}>{translate('header.register')}</Link>
        </Fragment>}
        </header>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
