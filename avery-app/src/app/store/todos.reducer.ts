import {TodoListItem} from '../models/todo-list-item';

export interface TodosState {
  list: Array<TodoListItem>;
  status: string;
}

const INITIAL_STATE: TodosState = {
  list: [],
  status: ''
};

export function todosReducer(prevState = INITIAL_STATE, action) {
  switch(action.type) {
    case 'DEFAULT_TODOS_RECEIVED': {
      const nextState = {
        list: action.payload
      };

      return Object.assign({}, prevState, nextState);
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
      const { list } = prevState;
      const nextState = {
        list: list.map(todoItem => {
          if (todoItem.id === todoId) {
            return Object.assign({}, todoItem, {
              isCompleted: true
            });
          }
          return todoItem;
        })
      };

      return Object.assign({}, prevState, nextState);
    }

    case 'DELETE_TODO': {
      const { todoId } = action.payload;
      const { list } = prevState;
      const nextState = {
        list: list.filter(todo => todoId !== todo.id)
      }

      return Object.assign({}, prevState, nextState);
    }

    default:
      return prevState;
  }
};
