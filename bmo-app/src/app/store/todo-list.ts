

export function todoListReducer (state =[], action){
    switch(action.type){
        case 'ADD_TODO_LIST_TASK':
            return state.concat(action.payload);
        default: 
            return state;
    }
}