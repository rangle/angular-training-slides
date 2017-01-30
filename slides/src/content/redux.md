# Redux

## Introduction

The necessity of managing the state.
 
In Redux your the state is a plain JavaScript object.  
 
State and immutability.
 
Actions and Reducers.

Middlewares and side-effects handlers.
 
Unidirectional data [flow](content/images/redux-flow.jpg).

---

## ng2-redux

Accessing Redux store from Angular components.

NgReduxModule and NgRedux injectable service. 
 
### Setup

NPM installation

```sh
npm install --save redux
npm install --save ng2-redux
```

---

Setup on Angular

```typescript
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<any>) {
    // Wait I don't have a rootReducer yet!
    ngRedux.configureStore(rootReducer, {}, [ ]);
  }

}
```

---

## Reducers

Providing root reducers.

Counter reducer

```typescript
// starts with zero
const INITIAL_STATE: number = 0;
// nop reducer for now
export function counterReducer(state: number = INITIAL_STATE, action: PayloadAction) {
  switch (action.type) {
    default:
      return state;
  }
}
```
Combine reducers.

```typescript
import { combineReducers } from 'redux';
import { counterReducer } from './counter';

export const rootReducer = combineReducers<any>({
  counter: counterReducer
});
```

---

Application bootstrapped with Redux!

---

## Action Creators

Dispatching actions with NgRedux.
 
Action structure

```typescript
interface Action {
  type: any; // type is unique in the app and describes the action itself
}
```

Payload action concept 

```typescript
import { Action } from 'Redux';

interface PayloadAction extends Action {
  payload: any; // additional data inside here
}
```

Counter action.

```typescript
export const add = () => ({ type: 'ADD' });
```

---

Handling `ADD` action
```typescript
export function counterReducer(state: number = INITIAL_STATE, action:any) {
  switch (action.type) {
    // in case action.type is equal to 'ADD' we know that we should 
    // update the app state
    case 'ADD':
      return state + 1;
    default:
      return state;
  }
}
```

Dispatching on button pressed
```typescript
@Component({
  selector: 'app-root',
  ...
})
export class AppComponent {
  title = 'app works!';
  constructor(private ngRedux: NgRedux<any>) {}
  onClickAdd() { this.ngRedux.dispatch(add()); }
}
```

---

Reading values from the store.

Getting `Observable` from `@select` and `ngRedux.select()`.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  // get an observable here which the value is the counter property in our state
  @select(state => state.counter) counter$: Observable<number>;

  constructor(private ngRedux: NgRedux<any>) {}

  onClickAdd() {
    this.ngRedux.dispatch(add());
  }

}
```

Dumb / Smart component architecture and async pipe.


---

## Select method in depth.

Types of selectors

```typescript
export type PropertySelector = string | number | symbol;
export type PathSelector = (string | number)[];
export type FunctionSelector<RootState, S> = ((s: RootState) => S);
export type Comparator = (x: any, y: any) => boolean;
```

Select method

```typescript
export class NgRedux<RootState> {
  select<S>(
    selector?: PropertySelector | PathSelector | FunctionSelector<RootState, S>,
    comparator?: Comparator): Observable<S> {
    ...         
  }
}
```

---

## Middlwares

Conceptually similar to server side middlewares.

Happens between dispatching an action and the moment it reaches the reducers.

Common uses: logging, side-effect handlers, and errors reports.

Redux-logger example:

```typescript
const createLogger = require('redux-logger');
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {}, [ createLogger() ]);
  }
}
```

Every action dispatched can be inspected in the browser [console](content/images/redux-logger.jpg)

---

Writing your own middleware:

```typescript
const logger = store => next => action => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}
```

Middlewares have access to the store, action, and can call next.

Next makes the action go through all reducers.

`Store.getState()` after `next()`, already have the new state.
