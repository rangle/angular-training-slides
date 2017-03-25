

export function todoListReducer (state =[], action){
    switch(action.type){
        case 'ADD_TODO_LIST_TASK':
            return state.concat(action.payload);
        case 'COMPLETE_TODO_LIST_TASK':
            state[action.payload.taskIndex].isComplete = true;
            return state;
        case 'DELETE_TODO_LIST_TASK':
            state.splice(action.payload.taskIndex, 1);
            return state;
        default: 
            return state;
    }
}