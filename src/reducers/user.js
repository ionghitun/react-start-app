export default (state = {
    user: false,
    loginErrors: false,
    loading: true
}, action) => {
    switch (action.type) {
        case 'SET_USER':
            if (action.payload) {
                state = {...state, user: Object.assign({}, action.payload)};
            } else {
                state = {...state, user: false};
            }
            break;
        case 'SET_USER_ERRORS':
            if (action.payload) {
                state = {...state, loginErrors: Object.assign({}, action.payload)};
            } else {
                state = {...state, loginErrors: false};
            }
            break;
        case 'SET_LOADING':
            state = {...state, loading: action.payload};
            break;
        default:
            return state;
    }

    return state;
};
