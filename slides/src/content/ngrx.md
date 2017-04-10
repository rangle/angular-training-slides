# Redux (@ngrx)

---

## What Should a Good State System Achieve?

1. Create [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
1. [Separation of Concern](https://en.wikipedia.org/wiki/Separation_of_concerns) : Separation of Data and Logic
1. Improve scalability by having things _react_ to events as opposed to caller dictating actions
1. Create a coherent framework so future developers will know how to add features by following convention
1. [Uni-Directional Data Flow](http://redux.js.org/docs/basics/DataFlow.html) : Easy to reason about the interactions between actors

---

## Why Can't We Use Backend Programming Patterns to Model Frontend Dataflow?

There are two major differences between handling server requests and user interactions.

1. The user requests are handled by the screen; server requests are handled by multi-threaded servlets
1. The user requests often modify the same objects; server requests usually modify objects of different users
1. The user expects to be notified about change immediately, server only informs change when requested

<strong> Due to these reasons the front-end has to think differently about components communicating with each other.</strong>

---

## Similarities of Structure - Redux vs Backend Architecture

| Function | Angular With `@ngrx`  | Server |
|---|---|---|
| Data Storage | Store  |  Database  |
| Presentation View |  `@Component`  | Client API  |
| Logic to massage data for Storage |  `@Effects`  | Services |
| Communication | Action / Observables  | Function Invocation |

---

## Redux as a System

<img src="/content/images/redux-and-data-flow.png" width="50%"/>

---

## Actions

1. Responsible for passing data towards the store
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
    this.store.dispatch({ type: 'TODO_TASK_ADDED', payload: {
      name: name,
    });
  }
}
```

---

## `@Component` Uses `Actions` to Broadcast to the Store

1. Responsible for presentation and user interactions
1. Components are blind to the complexities of the app (Doesn't know what happens after action is broadcasted)
1. Affect the state via Actions
1. Describes a need or event without dictating how to fulfill the need or what to do with the event
1. Eg. Event => TODO_TASK_ADDED
    1. `taskDisplay` reacts by => `displayTask()`
    1. `deleteButton` reacts by => `enableDeleteTask()`

---

## How Do We Interact With Actions

### A store is:

1. Responsible for application state (Immutability, Persisting to Disk etc.)
1. The [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
1. Keeper of stateful information, void of business logic
1. Can only be affected by actions
1. Prevent unintentional modifications by other methods via object reference, or directly accessing store members

---

## Sample Store

```ts
// Root module
import { StoreModule } from '@ngrx/store';
import { people } from './people'; // Reducers

@NgModule({
  imports: [ ..., StoreModule.provideStore({ people }) ],
})
export class AppModule {  }
```

```ts
// Reducer (be careful if we use export const people = (state, action) => {} syntax AOT will complain)
export function people (state = [], action) {
  switch (action.type) {
    case 'TODO_TASK_ADDED':
      return state.concat(action.payload);
    default:
      return state;
  }
}
```


---

## Redux Sounds Complex

The best way to learn Redux is to visualize what is happening inside of the system.

We can do this using the [Redux DevTools Extension](http://extension.remotedev.io/#installation) which is useful not only for visualization, but debugging our application as well.

We can go ahead an install this extension into our browser of choice with the appropriate link [here](http://extension.remotedev.io/#installation) (in our case we will be using Google Chrome).

---

## @ngrx/store-devtools

With our extension installed, we need to configure our application to make use of the dev tools by installing `@ngrx/store-devtools`:

`npm install @ngrx/store-devtools --save`

and then import the `StoreDevtoolsModule` into our module.

```ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({})
  ]
})
export class AppModule { }
```

---

## Redux DevTools

Upon successful installation of the Redux DevTools Extension and configuration of of the `StoreDevToolsModule`, there will be a new "Redux" tab in our browser's developer tools pane.

Selecting this tab, we should now see something similar to this.

<img src="/content/images/redux-devtools.png" width="50%"/>

---

## How Do We Get Information From the Store?

1. State is exposed through the `Store` service as an `Observable` stream
1. The select carries information away from the store
1. Using the select pattern
1. `Store` provides a `.select()` method to select pieces of state:
  1. By key: `this.store.select('people')`
  1. By nested key: `this.store.select('city', 'people')`
  1. By function: `this.store.select(state => state.people)`
1. Can chain other operators like `.filter()`, `.map()` to have finer-grained control over selected data

---

## Sample Select

```ts
@Component({
  selector: 'people',
  template: `
    <ul>
      <li *ngFor="let person of people">{{ person.name }}</li>
    </ul>
  `
})
export class PeopleComponent implements OnInit {
  private people: Person[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select('people')
      .subscribe((people: Person[]) => this.people = people);
  }
}
```

---

## Handling Async Events in the Application With Redux

### The @ngrx/effects Library is:

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

No, a reducer only describes _how_ the store's state should change based on a dispatched action. Our actual state is stored outside of our reducers. In the case of `@ngrx`, state is stored within an `Observable` stream that can be listened to.

---

## FAQ: Does the UI Broadcast Actions and Store Broadcast Actions Back?

The UI should not broadcast actions directly, it can and often should dispatch actions through "action creator" methods which can be made available through a component or service.

In a more traditional Flux architecture, while a store may have broadcasted actions whenever state changed, Redux does not. Instead of reacting to actions dispatched out from our store, we instead react to the changes in our state itself, we don't concerned ourselves with _how_ state has changed.

The Actions are generally what we call the events being broadcasted to the store.  When events leave the store due to a state change it is done through a store select.

---

## FAQ: Instead of Dealing With Observables, Can we Simply Call Methods Directly?

By calling methods directly, we must now take on the responsibility of manually managing state (often spread across numerous locations) and ensuring that all concerned portions of our application are notified of updated state. This approach tends to be more error-prone and is more difficult to maintain and scale in larger applications.

The advantage of Redux is that this state management is handled in one location which is easier to reason about, and our application can simply react whenever application state changes.

---

## FAQ: I Have an Awesome Idea/Implementation that Does the Same Thing, Can I Use That?

Absolutely. Ultimately Redux is just a pattern for state management. Be warned however that many of the strengths of Redux lie in its conventions and community support. Convention allows other developers to ramp up quickly on a pattern they're already familiar with, and community support means better tooling, more middleware,updates/bug fixes, and a larger knowledge base to draw upon. Choose whichever solution ends up being best for you and your team.
