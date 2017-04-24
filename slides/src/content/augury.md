<!-- .slide: data-background="../content/images/title-slide.jpg" -->

##  Building Applications with Angular

# Augury

---

## What is Augury?

- [Augury](https://augury.angular.io/) is a Chrome DevTools extensions for debugging and profiling Angular applications
- Disclaimer: Augury was authored by [Rangle.io](http://rangle.io)

<img src="content/images/augury.svg" width="200" style="box-shadow: none" alt="Augury Logo"/>

---

## Installing Augury

- Augury is available through the Chrome web store and installed as a Chrome extension
- After installation, a tab labelled _Augury_ should be available in Chrome DevTools

![Augury in DevTools](content/images/chrome-devtools-augury.png)

---

## Integrating With Your Application

- Augury allows us to inspect our component tree to check the applicaton state at any point
  - Application must be running in development mode for Augury to work
  - This is the default for Angular CLI projects run with `ng serve`
- Displays what components are in our component tree
- Component properties' values are displayed and editable
- Custom events can be triggered using arbitrary values

---

## Basic Inspection with Augury

![Augury in Action](content/images/augury-component-tree.png)
