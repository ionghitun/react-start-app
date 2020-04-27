import {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import userActions from '../../actions/user';

const mapStateToProps = function (store) {
    return {
        user: store.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({...userActions}, dispatch);
};

function Logout(props) {
    useEffect(() => {
        if (!props.user) {
            props.history.push("/login");
        } else {
            const {logoutUser} = props;

            logoutUser();
        }
    }, [props]);

    return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
