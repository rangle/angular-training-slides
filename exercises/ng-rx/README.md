# ng-rx/store Exercise

Using the data provided in the file `data.json` create a to-do application as shown below:

![](./preview.gif)

## Step 1

Using the `angular-cli` create a new project called `ng-rx` inside of the `training` folder.

## Step 2

Copy the file `db.json` into the root folder and use `json-server` to start a fake REST api server. This file should serve as your initial to-do list of items loaded from the server. 

## Step 3

Inside the `app` folder create a sub folder called `store`. In that folder create your `action`, `effects`, `model` and `reducer`. 

## Step 4

Create a child component called `<todo-input>` to insert any new to-do items. 

## Step 5

Create a child component called `<todo-list>` to delegate the rendering of every individual `todo` item in the array. 
Add a `checkbox` for each item in the to-do list that allows us to complete the todo items. Add a `delete` button that allows us to delete any items. 