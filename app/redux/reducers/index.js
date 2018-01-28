import { combineReducers } from 'redux';
import { chapter, chapterIsLoading, chapterHasErrored } from './chapter';
import { books, booksHasErrored, booksIsLoading } from './books';
import { courses, coursesIsLoading, coursesHasErrored } from './courses';
import { livestream } from './livestream';
import { announcements } from './announcements';
import { events } from './events';
import { prayers } from './prayers';

export default combineReducers({
    chapter,
    chapterIsLoading,
    chapterHasErrored,
    books,
    booksIsLoading,
    booksHasErrored,
    courses,
    coursesIsLoading,
    coursesHasErrored,
    announcements,
    events,
    livestream,
    prayers,
});
