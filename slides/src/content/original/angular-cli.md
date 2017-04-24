<!-- .slide: data-background="../content/images/title-slide.jpg" -->
# Using the Angular CLI

---

## What is `angular-cli`

- `angular-cli` is a command line tool based on the `ember-cli`
- helps scaffold and generate code for Angular applications

Install with the following command:
```bash
  npm install -g @angular/cli
```

---

## Creating a New Project

- `ng new <path/to/project>` will scaffold an Angular project in the given path
- Runs `npm install` to install packages
- Initializes git repo in directory

For example, the following command would initialize a project named `myAwesomeProject`
```bash
  ng new myAwesomeProject
```

---

## Quiz

The name for the root module should be _________.:

1. `NgModule`
1. `AppModule`
1. Whatever you want.

<aside class="notes">

Correct answer is 2.

1 - NgModule is the name of the Decorator used for any Angular Module.
I feel one can easily mistake between NgModule and AppModule

3 - while it's possible that the root module can be anything,
convention is to name it AppModule and that's what our slides say.
This could be a good chance to bring it up that it's convention.

<https://angular.io/docs/ts/latest/guide/appmodule.html>

</aside>

---

## Code Generation

`angular-cli` has blueprints to generate:

|blueprint (shorthand)|                     |
|---------------------|---------------------|
| Component (c)       | Module    (m)       |
| Directive (d)       | Interface (i)       |
| Route     (r)       | Enum      (e)       |
| Pipe      (p)       | Class     (cl)      |
| Service   (s)       |                     |

```bash
  ng generate <blueprint> <path/to/file>
```
For example, to generate a component called `test`, use the following command

```bash
  ng generate component test    # Full command
  ng g c test                   # short hand for command
```

---

## Running Your Application

To run your application, use the following command
```bash
  ng serve    # Full command
  ng s        # Short hand for command
```
`ng serve` also rebuilds your application when a change is detected

---

## Testing

You can use the `angular-cli` to run your project's tests

- `ng e2e` will run your end to end with `protractor`
- `ng test` will run your unit tests with `karma`
