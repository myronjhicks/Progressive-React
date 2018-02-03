import * as types from '../config/types';
import initialState from '../config/initialState';

export function chapterHasErrored(state = false, action) {
    switch(action.type) {
        case types.CHAPTER_HAS_ERRORED:
            return action.hasErrored;
        default:
            return state;
    };
};

export function chapterIsLoading(state = false, action) {
    switch(action.type) {
        case types.CHAPTER_IS_LOADING:
            return action.isLoading;
        default:
            return state;
    };
};

export function chapter(state = initialState.chapter, action) {
    switch(action.type) {
        case types.CHAPTER_FETCH_DATA_SUCCESS:
            return action.chapter;
        default:
            return state;
    };
};
