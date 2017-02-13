import { TodoActions } from './todo.action';

export const TodoReducer = (state = [], action) => {
  switch (action.type) {
    case TodoActions.LOAD_TODO_ITEMS_SUCCESS: {
      return action.payload;
    }
    case TodoActions.ADD_TODO_ITEM:
      return [
        ...state,
        action.payload
      ];
    case TodoActions.DELETE_TODO_ITEM:
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];
    case TodoActions.TOGGLE_COMPLETE:
      return state.map((todoItem, index) => {
        if (index === action.payload) {
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