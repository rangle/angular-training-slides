# ES6 and Babel Review Exercise

An exercise to create a little node ES6 app, compiled with Babel

## Step 1

Create a new folder called `es6` inside of the `training` folder.  Run `npm init` in the `es6` folder to initialize a new npm package.

## Step 2

Install the Babel CLI in the `es6` folder with the command `npm i -D babel-cli`.  Then install the `babel-present-env` Babel preset (it will set the plugins/presets necessary for desired target) with the command `npm i -D babel-preset-env`.

## Step 3

Create a .babelrc file in `es6` and include the below in it:

```js
{
  "presets": ["env"]
}
```

## Step 4

Add the line `"build": "babel src -d lib"` to the `scripts` property of the `package.json` object (to allow building with Babel via the `npm run build` command).

## Step 5

In the `es6` folder create a `src` folder and inside it a file `index.js` and a file `birds.js`.

## Step 6

In the `birds.js` file create a class called `Bird` and another class called `Penguin`.  `Penguin` should extend `Bird`.  `Bird` should have properties for `height` and `weight`.  `Penguin` should inherit those and also have a `type` property.  Create appropriate constructors for each, taking intializers for all their properties.

## Step 7

Add a method to both classes called `walk`.  For the `Bird` the `walk` method should return a Promise that resolves after 2 seconds.  For the `Penguin` the `walk` method should return a Promise that resolves after 5 seconds. Use only arrow function syntax within `walk`.

## Step 8

Add another method to `Penguin` called `swim` which returns a Promise that resolves after 2 seconds.
