
import firebase from "../../config/firebase";

const database = firebase.database();

export function coursesHasError(bool) {
    return {
        type: 'COURSES_HAS_ERRORED',
        hasErrored: bool,
    };
};

export function coursesIsLoading(bool) {
    return {
        type: 'COURSES_IS_LOADING',
        isLoading: bool,
    };
};

export function coursesFetchDataSuccess(courses) {
    return {
        type: 'COURSES_FETCH_DATA_SUCCESS',
        courses
    };
};


export function fetchDiscipleshipHourCourses() {
    return (dispatch) => {

        database
        .ref('courses')
        .once('value')
        .then(function(snapshot){
            var courses = [];
            snapshot.forEach(function(childSnapshot){
                var data = childSnapshot.val();
                var course = {
                    id: childSnapshot.key,
                    name: data.name,
                    description: data.description
                };
                courses.push(course);
            });
            dispatch(coursesFetchDataSuccess(courses));
        }).catch(function(error){
            dispatch(coursesFetchDataSuccess(courses));
        });
    };
};