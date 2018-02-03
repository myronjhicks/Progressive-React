import * as types from '../config/types';
import initialState from '../config/initialState';

export function coursesHasErrored(state = false, action) {
    switch(action.type) {
        case types.COURSES_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    };
};

export function coursesIsLoading(state = false, action) {
    switch(action.type) {
        case types.COURSES_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    };
};

export function courses(state = initialState.courses, action) {
    switch(action.type) {
        case types.COURSES_FETCH_DATA_SUCCESS:
            return action.courses;
        default:
            return state;
    };
};
