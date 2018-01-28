
const BOOKS_URL = 'https://storage.googleapis.com/progressivechicago-94ed9.appspot.com/NASB/nasb-books.json';

export function booksHasError(bool) {
    return {
        type: 'BOOKS_HAS_ERRORED',
        hasErrored: bool,
    };
};

export function booksIsLoading(bool) {
    return {
        type: 'BOOKS_IS_LOADING',
        isLoading: bool,
    };
};

export function booksFetchDataSuccess(books) {
    return {
        type: 'BOOKS_FETCH_DATA_SUCCESS',
        books
    };
};

export function fetchBooks() {
    return (dispatch) => {
        dispatch(booksIsLoading(true));
        fetch(BOOKS_URL)
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
