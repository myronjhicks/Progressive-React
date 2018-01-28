export function prayers(state = [], action) {
    switch(action.type) {
        case 'PRAYER_ADDED':
          var newState = [...state, action.prayer]
          return newState
        case 'PRAYER_REMOVED':
          var newState = state.filter(a => a.key !== action.id)
          return newState
        default:
            return state;
    };
};
