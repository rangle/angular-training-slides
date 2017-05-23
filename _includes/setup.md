<!-- .slide: data-background="../images/title-slide.jpg" -->
<!-- .slide: id="setup-into" -->
## Building Applications with Angular

# Setup

---
<!-- .slide: id="setup-roadmap" -->
## Roadmap

1. How do I install the software I need for this training?
1. How do I create a new Angular project?
1. What is in a basic Angular project?
1. What is TypeScript?

---
<!-- .slide: id="setup-software-overview" -->
## Software Overview

- NPM (Node Package Manager) allows you to install JavaScript libraries
- NVM (Node version Manager) allows you to download, install, and switch between Node versions
  - Some NPM modules require specific versions of Node
  - And you may have to juggle multiple projects with different versions
  - So NVM allows you to do this without having to install and uninstall

---
<!-- .slide: id="setup-installing-nvm" -->
## Installing NVM

- Linux and Mac OS: go to [nvm.sh](http://nvm.sh) and follow instructions
  - Note: this defines `nvm` as a shell alias, *not* as a standalone program
  - So `which nvm` will *not* work
- Windows: go to [nvm-windows](https://github.com/coreybutler/nvm-windows)

---
<!-- .slide: id="setup-installing-node" -->
## Installing Node

- Get the latest LTS (Long Term Support) version
- `nvm install --lts`

---
<!-- .slide: id="setup-installing-angular-cli" -->
## Installing Angular CLI

- A command-line interface (CLI) for creating and managing Angular applications
- Not strictly necessary, but very useful
- `npm install --global @angular/cli`

---
<!-- .slide: id="setup-creating-a-new-project" -->
## Creating a New Project

`ng new todo`

This will:

- Create a new directory called `todo`
- Install the core Angular packages
- Install their dependencies
- Set up unit testing

This may take a few minutes to run the first time...

**Proxies:** Please  disable any proxies that you may have setup in your environment,
as they can interfere with downloading the packages.

---
<!-- .slide: id="setup-top-level-project-structure" -->
## Top-Level Project Structure

```
├── package.json
├── tsconfig.json
├── node_modules/
├── src/
```

- `package.json`: project metadata
  - Modules needed to run application
  - Custom commands
  - Author, version, and license information
- `node_modules`: directory containing libraries and dependencies used by the application
  - Do *not* edit by hand
- `src` folder: application code
- `tsconfig.json`: TypeScript configuration

---
<!-- .slide: id="setup-typescript" -->
## TypeScript

- TypeScript is a superset of modern JavaScript with optional type definitions
  - Useful in small projects
  - *Really* useful in large ones
- Use `.ts` as a file suffix
- TypeScript is compiled to JavaScript before being run in the browser
  - So types aren't visible in browser's debugger at runtime
- `./tsconfig.json` specifies how to compile it
  - E.g., whether to generate ES5- or ES6-compliant JavaScript

---
<!-- .slide: id="setup-typescript-example" -->
## TypeScript Example

```ts
function add(a: number, b: number) {
  return a + b;
}

add(1, 3);   // returns 4
add(1, '3'); // causes a compiler error

class TodoItems {
  items: string[];  // or Array<string>

  constructor(initialItems: string[]) {
    this.items = initialItems;
  }

  empty(): boolean {
    return this.items.length == 0;
  }
}

const allItems = new TodoItems(['install NPM', 'install Node']);
```
