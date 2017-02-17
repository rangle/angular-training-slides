# RxJS Exercises

## Exercise 1

Create an RxJS `Observable` to display 2 different integers using `setTimeout` and `next`.

## Exercise 2

Create an `Observable` from an array of numbers and using `map`, multiply each item by 2.

## Exercise 3

Using the `filter` operator create an RxJS `Observable` that will take an array of numbers from 1 to 10 and filters it to return any number greater than 5. 

## Exercise 4

Create an RxJS `Observable` that will output a number and then throw an error. 

## Exercise 5

Create an `Observable` from the string `hello`. 
Then create another `Observable` from the string `world`. 
Use `mergeMap` to print out `hello world`.

## Exercise 6

Create a chainable Observable from the array `[1,2,3,4,5]`.
Then use `filter`, `map` and `subscribe` to print out the below:

- 6
- 8
- 10

## Exercise 7

Create an Observable from the array `[0,1,2,3,4]`.
Then use `scan` to print out the below.
Use 10 as the initial value for `scan`. 

- 10
- 11
- 13
- 16
- 20

## Exercise 8

Create an Observable from the array `[0,1,2,3,4]`.
Then use `reduce` to sum all values to print 10.