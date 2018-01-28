export function events(state = [], action) {
    switch(action.type) {
        case 'EVENT_ADDED':
          const newState = [...state, action.event]
          return newState
        default:
            return state;
    };
};
