export function events(state = [], action) {
    switch(action.type) {
        case 'EVENT_ADDED':
          var newState = [...state, action.event]
          return newState;
        case 'EVENT_REMOVED':
          var newState = state.filter(a => a.key !== action.id)
          return newState;
        default:
            return state;
    };
};
