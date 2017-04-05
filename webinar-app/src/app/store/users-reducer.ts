import { Action } from '@ngrx/store';

export const userReducer = (state = {user: 'John'}, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}