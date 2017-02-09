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

## Code Generation

`angular-cli` has blueprints to generate:
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
