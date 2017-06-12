<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="translation" -->
## Building Applications with Angular

# Translations

---
<!-- .slide: id="translation-roadmap" -->
## Roadmap

- How do I localize an Angular application?

---
<!-- .slide: id="translation-setting-up-1" -->
## Setting Up

- We use `ngx-translate` to manage translations
  - Other options are available
- Install with `npm install @ngx-translate/core --save`
- Import `TranslateModule` in the root module
- Use `TranslateModule.forRoot()` to configure the `TranslateModule`
  - `TranslateModule.forRoot()` should be only called once in your root module

---
<!-- .slide: id="translation-setting-up-2" -->
## Setting Up

#### _src/app/app.module.ts_
```ts
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forRoot({...})
  ],
  // ...
})
export class AppModule { }
```

---
<!-- .slide: id="translation-configuring-the-translation-module-1" -->
## Configuring the Translation Module

- Can specify a loader, parser, or missing translation handler
- A loader can be used to load translations
  - `TranslateHttpLoader` can be used to load translations from HTTP
  - `npm install @ngx-translate/http-loader --save`
- Create a new object of `TranslateHttpLoader(http, prefix, suffix)`
  - Optionally define the folder that holds the translation files (defaults to `/assets/i18n/`)
  - Optionally define the file extension for your translation files (defaults to `.json`)

---
<!-- .slide: id="translation-configuring-the-translation-module-2" -->
## Configuring the Translation Module

#### _src/app/app.module.ts_
```ts
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ]
  // ...
```

---
<!-- .slide: id="translation-creating-translation-files" -->
## Creating Translation Files

- Create JSON files with names based on language codes

#### _assets/i18n/en.json_
```json
{
  "HOME": {
    "TITLE": "Welcome"
  }
}
```

#### _assets/i18n/fr.json_
```json
{
  "HOME": {
    "TITLE": "Bienvenue"
  }
}
```

- Translations can be accessed using dot notation: `HOME.TITLE`

---
<!-- .slide: id="translation-programmatically-creating-translations" -->
## Programmatically Creating Translations

- Translations can be created programmatically using the `setTranslation` method from `TranslateService`

```ts
translate.setTranslation('en', {
  HELLO: 'hello {{value}}'
});
```

- Use the `TranslateService` to set the default language:

```ts
translate.setDefaultLang('en');
```

- Or use it to get the current set language:

```ts
const browserLang = translate.getBrowserLang();
translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
```

---
<!-- .slide: id="translation-usage" -->
## Usage

- Using a pipe

```html
<h2>{{ 'HOME.TITLE' | translate }}</h2>
```

- Using a directive

```html
<div [translate]="'HOME.TITLE'"></div>
```

- Using a service

```ts
translate.get('HOME.TITLE', {}).subscribe((res: string) => {
  console.log(res);
});
```
