import * as types from '../config/types';
import initialState from '../config/initialState';

export function videos(state = initialState.videos, action) {
    switch(action.type) {
        case types.VIDEO_ADDED:
          var newState = [...state, action.video]
          return newState
        case types.VIDEO_REMOVED:
          var newState = state.filter(a => a.key !== action.id)
          return newState
        case types.VIDEO_UPDATED:
          const updatedItems = state.map(item => {
            if(item.key === action.video.key){
              return { ...item, ...action.video }
            }
            return item
          });
          return updatedItems
        default:
            return state;
    };
};
