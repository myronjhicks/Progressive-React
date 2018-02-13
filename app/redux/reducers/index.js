import { combineReducers } from 'redux';
import { chapter, chapterIsLoading, chapterHasErrored } from './chapter';
import { books, booksHasErrored, booksIsLoading } from './books';
import { courses, coursesIsLoading, coursesHasErrored } from './courses';
import { livestream } from './livestream';
import { announcements } from './announcements';
import { events } from './events';
import { prayers } from './prayers';
import { videos } from './videos';
import { blogPosts } from './blogPosts';
import { worshipGuide } from './worshipGuide';
import { auth } from './auth';

export default combineReducers({
    auth,
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
    videos,
    blogPosts,
    worshipGuide
});
