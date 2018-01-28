export function livestream(state = '', action) {
  switch(action.type) {
      case 'LIVESTREAM_UPDATED':
          return action.id;
      default:
          return state;
  };
}
