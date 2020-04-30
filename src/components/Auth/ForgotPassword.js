import React, {Fragment, useEffect, useState} from 'react';
import AuthCard from "../Reusable/AuthCard";
import {translate} from "../../libs/translate";
import {Alert, Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";

import {Link} from 'react-router-dom';
import http from "../../libs/http";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = function (store) {
    return {
        user: store.user
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

function ForgotPassword(props) {
    const [showCode, setShowCode] = useState(false);
    const [email, setEmail] = useState('');
    const [codeEmail, setCodeEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [info, setInfo] = useState({type: '', show: false, text: ''});

    useEffect(() => {
        if (props.user && props.user.user) {
            props.history.push("/");
        }
    }, [props]);

    const _forgot = async (e) => {
        e.preventDefault();

        let data = {
            email
        };

        let res = await http.route('forgot-password').post(data);

        if (!res.isError) {
            setCodeEmail(email);
            setEmail('');
            setErrors(false);
            setInfo({type: 'info', show: true, text: translate('forgotPassword.infoCode')});
            setShowCode(true);
        } else {
            setErrors(res.errorMessages);
        }
    };

    const _change = async (e) => {
        e.preventDefault();

        setInfo({type: '', show: false, text: ''});
        setErrors(false);

        let data = {
            email: codeEmail,
            code,
            password,
            retypePassword
        };

        let res = await http.route('change-password').post(data);

        if (!res.isError) {
            setCodeEmail('');
            setCode('');
            setPassword('');
            setRetypePassword('');
            setInfo({type: 'success', show: true, text: translate('forgotPassword.infoLogin')});
        } else {
            setErrors(res.errorMessages);
        }
    };

    const _setShowCode = (value) => {
        setErrors(false);
        setShowCode(value);
    }

    const _renderMain = () => {
        return <Fragment>
            {errors && errors.forgot && <Alert color={'warning'}>{errors.forgot}</Alert>}
            {errors && errors.account && <Alert color={'warning'}>{errors.account}</Alert>}
            <Form onSubmit={_forgot}>
                <FormGroup>
                    <Label>{translate('forgotPassword.email')}</Label>
                    <Input type="email" name="email" value={email}
                           placeholder={translate('forgotPassword.emailPlaceholder')}
                           onChange={(e) => setEmail(`${e.target.value}`)}
                           {...(errors && errors.email ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.email && <FormFeedback>
                        {errors.email}
                    </FormFeedback>}
                </FormGroup>
                <Button type={'submit'} onClick={_forgot}>{translate('forgotPassword.submit')}</Button>
            </Form>
            <Link to={'login'}>{translate('forgotPassword.login')}</Link><br/>
            <span className={'fake-link'}
                  onClick={() => _setShowCode(true)}>{translate('forgotPassword.haveACode')}</span>
        </Fragment>;
    }

    const _renderCode = () => {
        return <Fragment>
            {info.show && <Alert color={info.type}>{info.text}</Alert>}
            {errors && errors.forgot && <Alert color={'warning'}>{errors.forgot}</Alert>}
            <Form onSubmit={_change}>
                <FormGroup>
                    <Label>{translate('forgotPassword.codeEmail')}</Label>
                    <Input type="email" name="email" value={codeEmail}
                           placeholder={translate('forgotPassword.codeEmailPlaceholder')}
                           onChange={(e) => setCodeEmail(`${e.target.value}`)}
                           {...(errors && errors.email ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.email && <FormFeedback>
                        {errors.email}
                    </FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label>{translate('forgotPassword.code')}</Label>
                    <Input type="text" name="code" value={code}
                           placeholder={translate('forgotPassword.codePlaceholder')}
                           onChange={(e) => setCode(`${e.target.value}`)}
                           {...(errors && errors.code ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.code && <FormFeedback>
                        {errors.code}
                    </FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label>{translate('register.password')}</Label>
                    <Input type="password" name="password" value={password}
                           placeholder={translate('register.passwordPlaceholder')}
                           onChange={(e) => setPassword(`${e.target.value}`)}
                           {...(errors && errors.password ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.password && <FormFeedback>
                        {errors.password}
                    </FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label>{translate('register.retypePassword')}</Label>
                    <Input type="password" name="retypePassword" value={retypePassword}
                           placeholder={translate('register.retypePasswordPlaceholder')}
                           onChange={(e) => setRetypePassword(`${e.target.value}`)}
                           {...(errors && errors.retypePassword ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.retypePassword && <FormFeedback>
                        {errors.retypePassword}
                    </FormFeedback>}
                </FormGroup>
                <Button type={'submit'} onClick={_change}>{translate('forgotPassword.submitCode')}</Button>
            </Form>
            <Link to={'login'}>{translate('forgotPassword.login')}</Link><br/>
            <span className={'fake-link'}
                  onClick={() => _setShowCode(false)}>{translate('forgotPassword.tryAgain')}</span>
        </Fragment>;
    }

    return <AuthCard title={translate('forgotPassword.title')}>
        {!showCode && _renderMain()}
        {showCode && _renderCode()}
    </AuthCard>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
