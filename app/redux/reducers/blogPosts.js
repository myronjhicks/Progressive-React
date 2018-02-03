import * as types from '../config/types';
import initialState from '../config/initialState';

export function blogPosts(state = initialState.blogPosts, action) {
    switch(action.type) {
        case types.BLOG_POST_ADDED:
          var newState = [...state, action.post]
          return newState
        case types.BLOG_POST_REMOVED:
          var newState = state.filter(a => a.key !== action.id)
          return newState
        case types.BLOG_POST_UPDATED:
          const updatedItems = state.map(item => {
            if(item.key === action.post.key){
              return { ...item, ...action.post }
            }
            return item
          });
          return updatedItems
        default:
            return state;
    };
};
