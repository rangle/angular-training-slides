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
- Useful for debugging as well as visualization
- [Install Google Chrome extension](http://extension.remotedev.io/#installation)

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
