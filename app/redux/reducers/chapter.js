export function chapterHasErrored(state = false, action) {
    switch(action.type) {
        case 'CHAPTER_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    };
};

export function chapterIsLoading(state = false, action) {
    switch(action.type) {
        case 'CHAPTER_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    };
};

export function chapter(state = {}, action) {
    switch(action.type) {
        case 'CHAPTER_FETCH_DATA_SUCCESS':
            return action.chapter;
        default:
            return state;
    };
};