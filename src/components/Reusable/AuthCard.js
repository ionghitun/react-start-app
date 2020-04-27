import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function AuthCard(props) {
    const {title, className, children} = props;

    let classes = classNames('auth-card', className);

    return <div className={classes}>
        <div className={'auth-card-title'}>{title}</div>
        <div className={'auth-card-content'}>
            {children}
        </div>
    </div>;
}

AuthCard.propTypes = {
    title: PropTypes.string.isRequired
}

export default AuthCard;
