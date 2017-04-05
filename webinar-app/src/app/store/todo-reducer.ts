import { Action } from '@ngrx/store';

let defaultTask = [
    getTask('Task 1'),
    getTask('Task 2'),
    getTask('Task 3'),
];

function getTask(taskInput: string) {
    return {
        label: taskInput,
        isComplete: false
    };
}
export const todoReducer = (state = [], action: Action) => {
    switch (action.type) {
        case 'DEFAULT_TODO_LIST_LOADED':
            return state.concat(action.payload);
        case 'TODO_TASK_COMPLETED':
            // TODO
            return state;
        case 'TODO_TASK_DELETED':
            // TODO
            return state;
        case 'TODO_TASK_ADDED':
            let label = action.payload;
            let task = {
                label: label,
                isComplete: false
            };
            return state.concat(task);
        default:
            return state;
    }
}