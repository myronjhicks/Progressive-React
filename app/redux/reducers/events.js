import * as types from '../config/types';
import initialState from '../config/initialState';

export function events(state = initialState.events, action) {
    switch(action.type) {
        case types.EVENT_ADDED:
          var newState = [...state, action.event]
          return newState;
        case types.EVENT_REMOVED:
          var newState = state.filter(a => a.key !== action.id)
          return newState;
        default:
            return state;
    };
};
