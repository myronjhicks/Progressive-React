import firebase from "../../config/firebase";
import * as types from '../config/types';
const ref = firebase.database().ref('blog_posts');


function addPost(post){
  return {
    type: types.BLOG_POST_ADDED,
    post
  };
}

function removePost(id){
  return {
    type: types.BLOG_POST_REMOVED,
    id
  }
}

function updatePost(post) {
  return {
    type: types.BLOG_POST_UPDATED,
    post
  };
}

export function listenToBlogs() {
    return (dispatch) => {
        ref.on('child_added', function(snap){
          const data = snap.val();
          const post = {
              key: snap.key,
              timestramp: data.timestamp,
              title: data.title,
              body: data.content
          };
          dispatch(addPost(post));
        });
        ref.on('child_removed', function(snap){
          dispatch(removePost(snap.key));
        });
        ref.on('child_changed', function(snap){
          const data = snap.val();
          const post = {
              key: snap.key,
              timestramp: data.timestamp,
              title: data.title,
              body: data.content
          };
          dispatch(updatePost(post));
        });
    };
};
