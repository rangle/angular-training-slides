<!-- .slide: data-background="../content/images/title-slide.jpg" -->
<!-- .slide: id="template-projection" -->
## Building Applications with Angular

# Template Projection

---
<!-- .slide: id="template-projection-roadmap" -->
## Roadmap

1. How do I project template into my child component?
1. What options are available?

---
<!-- .slide: id="template-projection-intro" -->
## Template Projection

- Ability to pass HTML to a child component and have it rendered there
  - Best use-case is a component card, to define a header, body and footer
- This was called _transclusion_ in Angular 1
- Use the built-in component `<ng-content>` to define where to render the projected content

#####_src/app/generic-input/generic-input.component.html_
```html
<p>
  <ng-content></ng-content>
  <input #newItem placeholder="item"/>
  <button (click)="addToDo(newItem)">+</button>
</p>
```

#####_src/app/app.component.html_
```html
<app-generic-input (newItem)="onNewItem($event)">
  <div>Enter a to do item</div>
</app-generic-input>
```

---
<!-- .slide: id="template-projection-defining-multiple-projection-areas" -->
## Defining Multiple Projection Areas

- Multiple `<ng-content>` tags can be used in a template by using the `select` attribute
- In the template, we can use an HTML tag, say, `<header>` to specify the position of projected content to the `ng-content` with `select="header"`

#####_src/app/generic-input/generic-input.component.html_
```html
<ng-content select="header"></ng-content>
<input #newItem placeholder="item"/>
<button (click)="addToDo(newItem)">+</button>
```

#####_src/app/app.component.html_
```html
<app-generic-input (newItem)="onNewItem($event)">
  <header><div>Enter a to do item</div></header>
</app-generic-input>
```

---
<!-- .slide: id="template-multiple-projections-with-css-classes" -->
## Multiple Projections with Class Selectors

- Besides tags, another option for specifying which `ng-content` tag to use is CSS classes
- This can be done by setting the value of the `select` attribute to a class selector such as `.header-content`
- Wrap the desired content in a `<div>` with the matching CSS class to specify content position


#####_src/app/generic-input/generic-input.component.html_
```html
<ng-content select=".header-content"></ng-content>
<input #newItem placeholder="item"/>
<button (click)="addToDo(newItem)">+</button>
```

#####_src/app/app.component.html_
```html
<app-generic-input (newItem)="onNewItem($event)">
  <div class="header-content">Enter a to do item</div>
</app-generic-input>
```