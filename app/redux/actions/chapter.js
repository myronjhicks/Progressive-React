import * as types from '../config/types';

export function chapterHasError(bool) {
    return {
        type: types.CHAPTER_HAS_ERRORED,
        hasErrored: bool,
    };
};

export function chapterIsLoading(bool) {
    return {
        type: types.CHAPTER_IS_LOADING,
        isLoading: bool,
    };
};

export function chapterFetchDataSuccess(chapter) {
    return {
        type: types.CHAPTER_FETCH_DATA_SUCCESS,
        chapter
    };
};

export function chapterFetchData(chapterId) {
    return (dispatch) => {
        dispatch(chapterIsLoading(true));
        var formattedChapterId = chapterId.replace(":", "_");
        var url = `${types.BIBLE_API}/${formattedChapterId}.json`;
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(chapterIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((chapter) => {
                dispatch(chapterFetchDataSuccess(chapter.response.chapters[0]));
            })
            .catch((error) => {
                return dispatch(chapterHasError(true))
            });
    };
};
