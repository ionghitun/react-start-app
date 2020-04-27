import store from '../store';

const _resolve = (path, obj) => {
    let lastPath = path.split('.').slice(-1)[0];

    return path.split('.').reduce(function (prev, curr) {
        if (lastPath === curr && typeof prev[curr] === 'object') {
            return path;
        }

        return prev ? typeof prev[curr] !== 'undefined' ? prev[curr] : path : path;
    }, obj || this);
};

export const translate = (key) => {
    let translation = store.getState().translation;

    if (Object.keys(translation).length > 0) {
        return _resolve(key, translation);
    }

    return key;
};
