<!-- .slide: data-background="../content/images/title-slide.jpg" -->

## Building Applications with Angular

# Translations (i18n)

---

## Roadmap

- Installation
- Configuring TranslateModule
- Creating Translation Files
- Programmatically Creating Translations
- Usage

---

## Installation

- Install `npm install @ngx-translate/core --save`
- Import `TranslateModule` in the root module
- Use `TranslateModule.forRoot()` to configure the `TranslateModule`
  - `TranslateModule.forRoot()` should be only called once in your root module

_src/app/app.module.ts_
```ts
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    …
  ],
  imports: [
    …
    TranslateModule.forRoot({…})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## Configuring TranslateModule

- Can be used to specify a loader, parser or missing translation handler
- A loader can be used to load translations
  - `TranslateHttpLoader` can be used to load translations from HTTP
  - `npm install @ngx-translate/http-loader --save`
- Create a new object of `TranslateHttpLoader(http, prefix, sufix)`
 - optionally define the folder that holds the translation files (defaults to `/assets/i18n/`)
 - optionally define the file extension for your translation files (defaults to `.json`)

```ts
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  …
  imports: [
    …
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ]
  …
```

---

## Creating Translation Files

- Name your `.json` files based off the language
  - `en.json`
  - `fr.json`

_assets/i18n/en.json_
```json
{
  "HOME": {
    "TITLE": "Welcome"
  }
}
```

_assets/i18n/fr.json_
```json
{
  "HOME": {
    "TITLE": "Bienvenue"
  }
}
```

- Translations can be accessed using the dot notation: `HOME.TITLE`

---

## Programmatically Creating Translations

- Translations can be created programmatically using the `setTranslation` method from `TranslateService`

```ts
translate.setTranslation('en', {
    HELLO: 'hello {{value}}'
});
```

- Use the `TranslateService` to set the default language

```ts
translate.setDefaultLang('en');
```

- Or use it to get the current set language 

```ts
const browserLang = translate.getBrowserLang();
translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
```

---

## Usage

- Use translations via a pipe, directive or service

Using a pipe

```html
<h2>{{ 'HOME.TITLE' | translate }}</h2>
```

Using a directive

```html
<div [translate]="'HOME.TITLE'"></div>
```

Using a service

```ts
translate.get('HOME.TITLE', {}).subscribe((res: string) => {
  console.log(res);
});
```

---