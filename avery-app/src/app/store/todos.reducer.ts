const INITIAL_STATE = {
  list: [],
  status: ''
};

export function todosReducer(prevState = INITIAL_STATE, action) {
  switch(action.type) {
    case 'DEFAULT_TODOS_RECEIVED': {
      return action.payload;
    }

    case 'ADD_TODO': {
      const { todo } = action.payload;
      const { list } = prevState;
      const nextState = {
        list: list.concat(todo)
      };

      return Object.assign({}, prevState, nextState);
    }

    case 'COMPLETE_TODO': {
      const { todoId } = action.payload;

      return prevState.map(todoItem => {
        if (todoItem.id === todoId) {
          todoItem.isCompleted = true;
        }
        return todoItem;
      });
    }

    case 'DELETE_TODO': {
      const { todoId } = action.payload;
      return prevState
        .filter(todo => todoId !== todo.id);
    }

    default:
      return prevState;
  }
};
