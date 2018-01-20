
import firebase from "../../config/firebase";

const firestore = firebase.firestore();

const COURSES = [
    {
        id: 1,
        name: "Beta Course Biblical Study",
        description: "This study is designed to take Christians back to the basics as we re-discover the teachings of the Bible."
    },
    {
        id: 2,
        name: "Developing a Servant's Heart",
        description: "This Bible study will equip you to serve the people around you (family, co-workers and neighbors) and those that you interact with every day."
    },
    {
        id: 3,
        name: "New Members Orientation Series",
        description: "An exciting series on your Faith, Family, Finances and Future as a member of the Progressive Baptist Church Family that prepares members for service and ministry."
    },
    {
        id: 4,
        name: "Saving Our Sons (Men's Discipleship)",
        description: "This study will break down four foundational essentials to engaging young men of color, arguing their validity from scripture and modern day experience."
    },
    {
        id: 5,
        name: "The Purpose and Power of Prayer",
        description: "This study provides unique perspective by taking the mystery out of prayer and providing practical answers for difficult questions about communicating with God."
    }
];

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
        firestore
        .collection('courses')
        .get()
        .then(function(querySnpshot){
            var courses = [];
            querySnpshot.forEach(function(doc){
                var data = doc.data();
                var course = {
                    id: doc.id,
                    name: data.name,
                    description: data.description
                }
                courses.push(course);
            });
            dispatch(coursesFetchDataSuccess(courses));
        }).catch(function(error) {
            var courses = COURSES;
            dispatch(coursesFetchDataSuccess(courses));
        });
    };
};