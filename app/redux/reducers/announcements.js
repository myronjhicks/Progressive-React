import * as types from '../config/types';
import initialState from '../config/initialState';

export function announcements(state = initialState.announcements, action) {
    switch(action.type) {
        case types.ANNOUNCEMENT_ADDED:
          var newState = [...state, action.announcement]
          return newState;
        case types.ANNOUNCEMENT_REMOVED:
          var newState = state.filter(a => a.key !== action.id)
          return newState;
        case types.ANNOUNCEMENT_UPDATED:
          const updatedItems = state.map(item => {
            if(item.key === action.announcement.key){
              return { ...item, ...action.announcement }
            }
            return item
          });
          return updatedItems
        default:
            return state;
    };
};
