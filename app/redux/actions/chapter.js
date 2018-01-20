const BIBLE_API = 'https://storage.googleapis.com/progressivechicago-94ed9.appspot.com/NASB/CHAPTERS';

export function chapterHasError(bool) {
    return {
        type: 'CHAPTER_HAS_ERRORED',
        hasErrored: bool,
    };
};

export function chapterIsLoading(bool) {
    return {
        type: 'CHAPTER_IS_LOADING',
        isLoading: bool,
    };
};

export function chapterFetchDataSuccess(chapter) {
    return {
        type: 'CHAPTER_FETCH_DATA_SUCCESS',
        chapter
    };
};

export function chapterFetchData(chapterId) {
    return (dispatch) => {
        dispatch(chapterIsLoading(true));
        var formattedChapterId = chapterId.replace(":", "_");
        var url = `${BIBLE_API}/${formattedChapterId}.json`;
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