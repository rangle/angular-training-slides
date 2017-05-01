# Redux (@ngrx)

---

## Motivation 

1. Create [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) 
1. [Separation of Concern](https://en.wikipedia.org/wiki/Separation_of_concerns) : Separation of Data and Logic
1. Improve scalability by having things _react_ to events as opposed to caller dictating actions
1. Reduce Complexity of Mental Map by promoting separation of responsibility between components
1. Create a coherent framework so future developers will know how to add features by following convention
1. [Uni-Directional Data Flow](http://redux.js.org/docs/basics/DataFlow.html) : Easy to reason about the interractions between actors

---

## Structure of Systems - Redux vs Server Architecture

| Function | Angular With `@ngrx`  | Server |
|---|---|---|
| Data Storage | Store  |  Database  | 
| Presentation View |  `@Component`  | Client API  |
| Logic to massage data for Storage |  `@Effects`  | Services |
| Communication | Action / Observables  | Function Invocation | 

---

## Store

1. Responsible for application state (Immutability, Persisting to Disk etc.)
1. The [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
1. Keeper of stateful information, void of business logic
1. Can only be affected by actions
1. Prevent unintentional modifications by other methods via Object Reference, or Directly Accessing Store Members

---

## Sample Store 

```ts
//Root module
import { StoreModule } from '@ngrx/store';
import { people } from './people'; // Reducers

@NgModule({
  imports: [ ..., StoreModule.provideStore({ people }) ],
})
export class AppModule {  }
```

```ts
//Reducer
export const people = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_PERSON':
      return state.filter(person => person.id !== action.payload);
    default:
      return state;
  }
}
```

---

## The ngrx/effects Library

1. Responsible for Business Logic and Async actions (Http Calls)
1. Does not keep local state
1. Listens on the Action Stream and adheres to 'Action In Action Out'
1. Typical use is take user input, make http call, and provide output to go into store

---

## Handling Side Effects with `@Effect`

```ts

@Injectable()
export class CollectionEffects {
    constructor(private actions$: Actions, private db: Database) { }

    @Effect()
    removeBookFromCollection$: Observable<Action> = this.actions$
        .ofType(collection.ActionTypes.REMOVE_BOOK)
        .map((action: collection.RemoveBookAction) => action.payload)
        .mergeMap(book => this.db.executeWrite('books', 'delete', [ book.id ]))
        .map(() => {
            type : ActionTypes.REMOVE_BOOK_SUCCESS,
            payload : book.id
        })
        .catch(() => of(new collection.RemoveBookFailAction(book)));
}
```

---

## `@Component`

1. Responsible for Presentation and User Interractions
1. It is blind to the complexities of the app (Doesn't know what happens after action is broadcasted)
1. React to state change via select
1. Affect the state via Actions
1. Describes a need without dictating how to fulfill the need
1. Eg. Need => GET_MAIL
    1. `personOne` reacts by => `startWalking()`
    1. `personTwo` reacts by => `callTaxi()`

---

## Component Code

```ts
import { Store } from '@ngrx/store';
import { people } from './people';

@Component({
    selector: 'person-input',
    template: `
      <button (click)="add('John')">Add Person</button>
    `
})
export class PersonInputComponent {
    constructor(private store: Store<any>) { }

    add(name) {
        let person = {
            name: name,
        };

        this.store.dispatch({ type: 'ADD_PERSON', payload: person });
    }
}
```

---

## Actions

1. Responsible for Communication between parts of redux
1. Implemented with [Observable](http://reactivex.io/rxjs/) streams
1. Use actions instead of function Invocation
1. Listeners are responsible to determine how to react to actions

---

## Refactor Create Action Into Common Code

```ts
import {Action} from '@ngrx/store';

export function createAction(type, payload?): Action {
  return { type, payload };
}
```

```ts
const loginSendAction: Action = createAction('LOGIN_SEND', getCredentials());

function getCredentials(){
    return  {
        username: 'katie',
        password: '35c0cd1ecbbb68c75498b83c4e79fe2b'
    };
}
```

---

## Redux as a System 

<img src="content/images/redux-and-data-flow.png" width="50%"/>