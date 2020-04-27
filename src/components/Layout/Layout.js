import React from 'react';

import {Container} from "reactstrap";

import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
    return <Container fluid={true} className={'layout'}>
        <Header/>
        <div className={'content'}>
            {props.children}
        </div>
        <Footer/>
    </Container>;
}

export default Layout;
