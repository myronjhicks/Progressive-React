export function livestreamLoadingError(bool) {
    return {
        type: 'LIVESTREAM_HAS_ERRORED',
        hasErrored: bool,
    };
};

export function livestreamIsLoading(bool) {
    return {
        type: 'LIVESTREAM_IS_LOADING',
        isLoading: bool,
    };
};

export function livestreamLoding() {
    return (dispatch) => {
        dispatch(livestreamIsLoading(true));
    };
};

export function livestreamFinishedLoading()  {
    return (dispatch) => {
        dispatch(livestreamIsLoading(false));
    };
};