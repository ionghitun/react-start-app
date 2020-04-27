export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRANSLATION':
            state = {...action.payload};
            break;
        default:
            return state;
    }

    return state;
};
