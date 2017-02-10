import { TodoActions } from './../actions/todo.action';

export const TodoReducer = (state = [], action) => {
  switch (action.type) {
    case TodoActions.LOAD_TODO_ITEMS_SUCCESS: {
      return action.payload;
    }
    case TodoActions.ADD_TODO_ITEM:
      var length = state.length;
      action.payload.id = length;

      return [
        ...state,
        action.payload
      ];
    case TodoActions.DELETE_TODO_ITEM:
      return state.filter(todoItem => todoItem.id !== action.payload);
    case TodoActions.TOGGLE_COMPLETE:
      return state.map(todoItem => {
        if (todoItem.id === action.payload) {
          return Object.assign({}, todoItem, {
            complete: !todoItem.complete
          })
        }
        return todoItem;
      });

    default:
      return state;
  }
}