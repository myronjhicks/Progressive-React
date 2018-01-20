import { combineReducers } from 'redux';
import { chapter, chapterIsLoading, chapterHasErrored } from './chapter';
import { books, booksHasErrored, booksIsLoading } from './books';
import { courses, coursesIsLoading, coursesHasErrored } from './courses';
import { livestreamLoadingError, livestreamLoading} from './livestream';
import { announcements, announcementsHasErrored, announcementsIsLoading } from './announcements';

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
    livestreamLoadingError,
    livestreamLoading,
    announcements,
    announcementsHasErrored,
    announcementsIsLoading
});