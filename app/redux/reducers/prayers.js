import * as types from '../config/types';
import initialState from '../config/initialState';

export function prayers(state = initialState.prayers, action) {
    switch(action.type) {
        case types.PRAYER_ADDED:
          var newState = [...state, action.prayer]
          return newState
        case types.PRAYER_REMOVED:
          var newState = state.filter(a => a.key !== action.id)
          return newState
        case types.PRAYER_UPDATED:
          const updatedItems = state.map(item => {
            if(item.key === action.prayer.key){
              return { ...item, ...action.prayer }
            }
            return item
          });
          return updatedItems
        default:
            return state;
    };
};
