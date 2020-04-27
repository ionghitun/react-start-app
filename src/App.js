import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import Router from './router';
import store from './store';

import {onResize} from './actions/responsive';
import {getLanguages} from "./actions/languages";

function App(props) {
    useEffect(() => {
        store.dispatch(getLanguages());

        window.addEventListener('resize', _onResize);
    }, []);

    const _onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        store.dispatch(onResize({
            width,
            height
        }));
    }

    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    );
}

export default App;
