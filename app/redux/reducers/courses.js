export function coursesHasErrored(state = false, action) {
    switch(action.type) {
        case 'COURSES_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    };
};

export function coursesIsLoading(state = false, action) {
    switch(action.type) {
        case 'COURSES_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    };
};

export function courses(state = [], action) {
    switch(action.type) {
        case 'COURSES_FETCH_DATA_SUCCESS':
            return action.courses;
        default:
            return state;
    };
};