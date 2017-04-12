export function todosReducer(prevState = [], action) {
  switch(action.type) {
    case 'DEFAULT_TODOS_RECEIVED':
      return action.payload;

    default:
      return prevState;
  }
};
