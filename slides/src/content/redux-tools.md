<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Redux Tools

---

## Roadmap

1. What tools are available for working with Redux?

FIXME: this module needs to be proof-read

---

## What's Going On In There?

- Best way to learn Redux is to visualize what it's doing
- Use [Redux DevTools Extension](http://extension.remotedev.io/)
  - Shows application state
  - Provides visualization of all actions that have been dispatch
  - Time travelling by moving backwards and forwards on actions that have been dispatch

---

## Installation

- Works with many other tools:
  - Chrome through the [web store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/)
  - [Electron and others](http://extension.remotedev.io/#installation)
- After installing the extension in Chrome, there should be a tab in Chrome DevTools labeled "Redux".

![](content/images/chrome-redux-devtools.png)

---

## Configuration

- After installing the extension, we must configure our application to use it
  1. `npm install @ngrx/store-devtools --save`
  2. Import `StoreDevtoolsModule` into our module

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

- New "Redux" tab in our browser's developer tools pane after successful installation and configuration

<img src="/content/images/redux-devtools.png" width="50%"/>
