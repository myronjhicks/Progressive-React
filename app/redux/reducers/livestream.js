export function livestreamLoadingError(state = false, action) {
    switch(action.type) {
        case 'LIVESTREAM_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    };
};

export function livestreamLoading(state = true, action) {
    switch(action.type) {
        case 'LIVESTREAM_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    };
};