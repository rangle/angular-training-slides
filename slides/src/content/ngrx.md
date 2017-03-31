# Redux (@ngrx)

---

## What Should a Good State System Achieve? 

1. Create [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) 
1. [Separation of Concern](https://en.wikipedia.org/wiki/Separation_of_concerns) : Separation of Data and Logic
1. Improve scalability by having things _react_ to events as opposed to caller dictating actions
1. Create a coherent framework so future developers will know how to add features by following convention
1. [Uni-Directional Data Flow](http://redux.js.org/docs/basics/DataFlow.html) : Easy to reason about the interractions between actors

---

## Why We Can't Use Backend Programming Patterns to Model Frontend?

FIXME

---

## Structure of Systems - Redux vs Backend Architecture

| Function | Angular With `@ngrx`  | Server |
|---|---|---|
| Data Storage | Store  |  Database  | 
| Presentation View |  `@Component`  | Client API  |
| Logic to massage data for Storage |  `@Effects`  | Services |
| Communication | Action / Observables  | Function Invocation | 

---

## Redux as a System 

<img src="content/images/redux-and-data-flow.png" width="50%"/>

---

## Redux System Sounds Complex

FIXME (Setup Ngrx Dev-Tools)

---

## Actions

1. Responsible for communication between parts of redux
1. Implemented with [Observable](http://reactivex.io/rxjs/) streams
1. Use actions instead of function invocation
1. Listeners are responsible to determine how to react to actions
1. Has 2 properties, `type`, and by convention, `payload`
    1. `type` is the identifier the listeners can use to listen to actions
    1. `payload` is a flexible object that carries information

---

## How do We Dispatch An Action

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
        this.store.dispatch({ type: 'ADD_PERSON', payload: {
            name: name,
        });
    }
}
```

---

## `@Component` Use `Actions` to Communicate

1. Responsible for presentation and user Interactions
1. It is blind to the complexities of the app (Doesn't know what happens after action is broadcasted)
1. React to state change via select
1. Affect the state via Actions
1. Describes a need without dictating how to fulfill the need
1. Eg. Need => MAIL_REQUIRED
    1. `personOne` reacts by => `startWalking()`
    1. `personTwo` reacts by => `callTaxi()`

---

## How Do We Interract With Actions

### A store is:

1. Responsible for application state (Immutability, Persisting to Disk etc.)
1. The [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
1. Keeper of stateful information, void of business logic
1. Can only be affected by actions
1. Prevent unintentional modifications by other methods via object reference, or directly accessing store members

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

## How Do We Get Information From the Store?

FIXME

---

## Handling Async Events in the Application With Redux

### The ngrx/effects Library is:

1. Responsible for Business Logic and Async actions (Http Calls)
1. Does not keep local state
1. Listens on the action stream and adheres to 'Action In Action Out'
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
        .catch(() => Observable.of(new collection.RemoveBookFailAction(book)));
}
```

---

## FAQ: Is the Reducer the Store?

FIXME

---

## FAQ: Does the UI Braodcast Actions and Store Broadcast Actions Back?

FIXME

---

## FAQ: Instead of Dealing With Observables, Can we Simply Call Methods Directly?

FIXME

---

## FAQ: I Have an Awesome Idea/Implementation that Does the Same Thing, Can I Use That?

FIXME 