import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TodoActions {
    static LOAD_TODO_ITEMS = 'Load Todo Items';
    static LOAD_TODO_ITEMS_SUCCESS = 'Load Todo Items Success';
    static ADD_TODO_ITEM = 'Add todo Item';
    static TOGGLE_COMPLETE = 'Toggle todo Item';
    static DELETE_TODO_ITEM = 'Delete todo Item';

    loadTodoItems(): Action {
        return {
            type: TodoActions.LOAD_TODO_ITEMS
        };
    }

    loadTodoItemsSuccess(todoItems): Action {
        return {
            type: TodoActions.LOAD_TODO_ITEMS_SUCCESS,
            payload: todoItems
        };
    }

    addTodoItem(todoItem): Action {
        return {
            type: TodoActions.ADD_TODO_ITEM,
            payload: todoItem
        };
    }

    toogleComplete(id): Action {
        return {
            type: TodoActions.TOGGLE_COMPLETE,
            payload: id
        };
    }

    deleteTodoItem(todoItem): Action {
        return {
            type: TodoActions.DELETE_TODO_ITEM,
            payload: todoItem
        };
    }
}