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

function Register(props) {
    const [showCode, setShowCode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [codeEmail, setCodeEmail] = useState('');
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState(false);
    const [info, setInfo] = useState({type: '', show: false, text: ''});
    const [showResend, setShowResend] = useState(false);

    useEffect(() => {
        if (props.user && props.user.user) {
            props.history.push("/");
        }
    }, [props]);

    useEffect(() => {
        if (showCode) {
            setTimeout(() => {
                setShowResend(true);
            }, 15 * 1000)
        }
    }, [showCode]);

    const _register = async (e) => {
        e.preventDefault();

        let data = {
            name,
            email,
            password,
            retypePassword
        };

        let res = await http.route('register').post(data);

        if (!res.isError) {
            setName('');
            setCodeEmail(email);
            setEmail('');
            setPassword('');
            setRetypePassword('');
            setErrors(false);
            setInfo({type: 'info', show: true, text: translate('register.infoCode')});
            setShowCode(true);
        } else {
            setErrors(res.errorMessages);
        }
    };

    const _activate = async (e) => {
        e.preventDefault();

        setInfo({type: '', show: false, text: ''});
        setErrors(false);

        let data = {
            email: codeEmail,
            code
        };

        let res = await http.route('activate-account').post(data);

        if (!res.isError) {
            setCodeEmail('');
            setCode('');
            setInfo({type: 'success', show: true, text: translate('register.infoLogin')});
        } else {
            setErrors(res.errorMessages);
        }
    };

    const _resend = async () => {
        setInfo({type: '', show: false, text: ''});
        setErrors(false);

        let data = {
            email: codeEmail
        };

        let res = await http.route('resend-activation-code').post(data);

        if (!res.isError) {
            setInfo({type: 'info', show: true, text: translate('register.infoCodeResend')});
        } else {
            setErrors(res.errorMessages);
        }
    };

    const _renderMain = () => {
        return <Fragment>
            <Form onSubmit={_register}>
                <FormGroup>
                    <Label>{translate('register.name')}</Label>
                    <Input type="text" name="name" value={name}
                           placeholder={translate('register.namePlaceholder')}
                           onChange={(e) => setName(`${e.target.value}`)}
                           {...(errors && errors.name ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.name && <FormFeedback>
                        {errors.name}
                    </FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label>{translate('register.email')}</Label>
                    <Input type="email" name="email" value={email}
                           placeholder={translate('register.emailPlaceholder')}
                           onChange={(e) => setEmail(`${e.target.value}`)}
                           {...(errors && errors.email ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.email && <FormFeedback>
                        {errors.email}
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
                <Button type={'submit'} onClick={_register}>{translate('register.submit')}</Button>
            </Form>
            <Link to={'login'}>{translate('register.login')}</Link><br/>
            <span className={'fake-link'} onClick={() => setShowCode(true)}>{translate('register.showActivate')}</span>
        </Fragment>;
    }

    const _renderCode = () => {
        return <Fragment>
            {info.show && <Alert color={info.type}>{info.text}</Alert>}
            {errors && errors.account && <Alert color={'info'}>{errors.account}</Alert>}
            <Form onSubmit={_activate}>
                <FormGroup>
                    <Label>{translate('register.codeEmail')}</Label>
                    <Input type="text" name="email" value={codeEmail}
                           placeholder={translate('register.codeEmailPlaceholder')}
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
                    <Label>{translate('register.codeTitle')}</Label>
                    <Input type="text" name="code" value={code}
                           placeholder={translate('register.codePlaceholder')}
                           onChange={(e) => setCode(`${e.target.value}`)}
                           {...(errors && errors.code ? {
                               invalid: true
                           } : {})}
                    />
                    {errors && errors.code && <FormFeedback>
                        {errors.code}
                    </FormFeedback>}
                    {showResend && <div>
                        <div>{translate('register.resendCodeInfo')}</div>
                        <div className={'fake-link'} onClick={() => _resend()}>{translate('register.resendCode')}</div>
                    </div>}
                </FormGroup>
                <Button type={'submit'} onClick={_activate}>{translate('register.submitCode')}</Button>
            </Form>
            <Link to={'login'}>{translate('register.login')}</Link><br/>
            <span className={'fake-link'} onClick={() => setShowCode(false)}>{translate('register.back')}</span>
        </Fragment>;
    }

    return <AuthCard title={translate('register.title')}>
        {!showCode && _renderMain()}
        {showCode && _renderCode()}
    </AuthCard>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
