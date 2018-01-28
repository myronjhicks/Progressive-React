export function announcements(state = [], action) {
    switch(action.type) {
        case 'ANNOUNCEMENT_ADDED':
          var newState = [...state, action.announcement]
          return newState;
        case 'ANNOUNCEMENT_REMOVED':
          var newState = state.filter(a => a.key !== action.id)
          return newState;
        default:
            return state;
    };
};
