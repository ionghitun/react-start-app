export default (state = [], action) => {
    switch (action.type) {
        case 'SET_LANGUAGES':
            state = [...state, ...action.payload];
            break;
        default:
            return state;
    }

    return state;
};
