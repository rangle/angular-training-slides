<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Redux DevTools

---

## What is Redux DevTools?

Redux DevTools is a browser extension that allows for improved debugging. It:

- Shows application state
- Provides visualization of all actions that have been dispatch
- Time travelling by moving backwards and forwards on actions that have been dispatch

---

## How to get Redux DevTools

Redux DevTools is available in many platforms:

  - Chrome through the [web store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/)
  - [Electron and others](http://extension.remotedev.io/#installation)

After installing the extension in Chrome, there should be a tab in Chrome DevTools labeled "Redux".

![](content/images/chrome-redux-devtools.png)

---

## Integrating With Our Application

Before Redux DevTools can make sense of the application state, we need our Angular root module to provide some hints. Ngrx provides a module that does just this, `@ngrx/store-devtools`.

`npm install @ngrx/store-devtools --save`

_app.module.ts_
```ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer),
    // Instrumenting allows the DevTools extension to capture actions and store
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})
export class AppModule { }
```

---

## Using Redux DevTools

![](content/images/redux-devtools-example.png)

- Can see dispatched actions and the state before and after
- Can remove specific actions from the pipeline
- Manual dispatching of actions for testing
