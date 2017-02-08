# Using the Angular CLI

---

## What is Angular-cli

`Angular-cli` is a command line tool based on the `Ember-cli`
to help scaffold and generate code for Angular applications

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

## Code Generation

Angular-cli has blueprints to generate:
  - Components (c)
  - Directives (d)
  - Routes     (r)
  - Pipes      (p)
  - Modules    (m)

```bash
  ng generate <blueprint> <path/to/file>
```
For example, to generate a component called `test`, use the following command

```bash
  ng generate component test    # Full command
  ng g c test                   # short hand for command
```

---

## Testing

You can use the Angular-cli to run your project's tests

- `ng e2e` will run your end to end with `protractor`
- `ng test` will run your unit tests with `karma`
