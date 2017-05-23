<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="augury" -->
##  Building Applications with Angular

# Augury

---
<!-- .slide: id="augury-what-is-augury" -->
## What is Augury?

- [Augury](https://augury.angular.io/) is a Chrome DevTools extensions for debugging and profiling Angular applications
- Disclaimer: Augury was authored by [Rangle.io](http://rangle.io)

<img src="../images/augury.svg" width="200" style="box-shadow: none" alt="Augury Logo"/>

---
<!-- .slide: id="augury-installing" -->
## Installing Augury

- Augury is available through the Chrome web store and installed as a Chrome extension
- After installation, a tab labelled *Augury* should be available in Chrome DevTools

![Augury in DevTools](../images/chrome-devtools-augury.png)

---
<!-- .slide: id="augury-integrating" -->
## Integrating With Your Application

- Augury allows us to inspect our component tree to check the application state at any point
  - Application must be running in development mode for Augury to work
  - This is the default for Angular CLI projects run with `ng serve`
    - `ng serve` is the CLI command run by `npm start`
- Displays what components are in our component tree
- Component properties' values are displayed and editable
- Custom events can be triggered using arbitrary values

---
<!-- .slide: id="augury-inspecting" -->
## Basic Inspection with Augury

![Augury in Action](../images/augury-component-tree.png)
