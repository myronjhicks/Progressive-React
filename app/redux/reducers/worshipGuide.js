import * as types from '../config/types';
import initialState from '../config/initialState';

export function worshipGuide(state = initialState.worshipGuide, action) {
  switch(action.type) {
      case types.GUIDE_UPDATED:
          return action.link;
      default:
          return state;
  };
}
