##  Building Applications with Angular

# Augury

---

<img src="content/images/augury.svg" width="200" style="box-shadow: none"/>
## What is Augury?

Augury (https://augury.angular.io/) is a Chrome DevTools extensions that allows for easy debugging and profiling of Angular 2 applications.

_Disclaimer: Augury was authored by Rangle.io_

---


## How to get Augury

- Augury is available through the Chrome web store and installed as a Chrome extension.
- After downloading and installing Augury, a tab labelled _Augury_ should be available in Chrome DevTools

![](content/images/chrome-devtools-augury.png)

---

## Integrating With Your Application

For Augury to work with your application, it needs to be running in development mode. For our Angular CLI project, this is the default mode served by `ng serve`

---

## Basic Inspection with Augury

![](content/images/augury-component-tree.png)

- Augury allows us to inspect our component tree to check out the state of our application at any point
- What components are in our component tree are displayed
- Values of different component properties are displayed and editable
- Custom events can be triggered using inputted values

