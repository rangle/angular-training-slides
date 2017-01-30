# Structural Directives Exercise

Using the data provided in the file `data.json` create a filtered list application as shown below

![](./preview.gif)

## Step 1

Using the `angular-cli` create a new project called `structural-directives` inside of the `training` folder.

## Step 2

Copy the file `data.json` into the project and import its content into the root component of your application. Make sure your able to read its content using `console.log`.

> To import a JSON file you have to use `require` instead of `import` because it's not a valid Javascript module (ES6) but a file that Webpack can load and transform into a Javascript object.

## Step 3

Create a Typescript `interface` called `Laptop` that describes the structure of the items found in the file `data.json`

## Step 4

Use the structural directive `NgFor` to display the properties `description`, `price` and `inStock` of the laptops in the root component.

## Step 5

Create a child component called `<app-laptop>` to delegate the rendering of every individual `laptop` in the array and use the following CSS to give it some style:

```css
:host {
  display: block;
  border: 1px solid black;
  margin: 1rem 0;
  padding: 1rem;
}

.title {
  margin-top: 0;
  font-size: 1.2rem;
}

label {
  font-weight: bold;
}

.price, .in-stock {
  display: inline-block;
}

.in-stock {
  margin-left: 1rem;
}
```

## Step 6

Create a `<app-filter>` component with three buttons that perform the following filtering:

- **In Stock:** Show all the laptops that are in stock
- **Out Stock:** Show only the laptops that are out of stock
- **All:** Show all the laptops

## Step 7

Add two more buttons to the `<app-filter>` component to order the laptops array:

- **Ascending:** Put the cheapest laptops at the top
- **Descending:** Put the cheapes laptops at the bottom

## Step 8

Create a component called `<app-laptop-list>` to delegate the filtering and listing of laptops. At the end, the root component's template should only be:

```html
<app-laptop-list></app-laptop-list>
```
