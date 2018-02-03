import * as types from '../config/types';
import initialState from '../config/initialState';

export function livestream(state = initialState.livestream, action) {
  switch(action.type) {
      case types.LIVESTREAM_UPDATED:
          return action.id;
      default:
          return state;
  };
}
