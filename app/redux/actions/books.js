import * as types from '../config/types';

export function booksHasError(bool) {
    return {
        type: types.BOOKS_HAS_ERRORED,
        hasErrored: bool,
    };
};

export function booksIsLoading(bool) {
    return {
        type: types.BOOKS_IS_LOADING,
        isLoading: bool,
    };
};

export function booksFetchDataSuccess(books) {
    return {
        type: types.BOOKS_FETCH_DATA_SUCCESS,
        books
    };
};

export function fetchBooks() {
    return (dispatch) => {
        dispatch(booksIsLoading(true));
        fetch(types.BOOKS_URL)
            .then(response => {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(booksIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((books) => {
                dispatch(booksFetchDataSuccess(books.response.books));
            })
            .catch(() => dispatch(booksHasError(true)));
    };
};
