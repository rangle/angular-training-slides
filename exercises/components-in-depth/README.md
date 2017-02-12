# Components in Depth Exercise

Create a component with the following behaviour

![](./preview.gif)

## Step 1

Using the `angular-cli` create a new project called `components-in-depth` inside of the `training` folder.

## Step 2

Create a child component called `<app-timer>` with three buttons.

- **Start timer:** Starts the timer
- **Stop timer:** Stops the timer
- **Reset timer:** Resets the timer

Using `<ng-content>` with `select`, allow each button to receive its own custom label

## Step 3

Add an `@Input` interval property, and a currentTime property both of type `number`

- **interval** Acts as the step interval for the timer
- **currentTime:** Will store the current callculated time
- **currentTimer:** Will store the current timer id

## Step 4

Add 4 `@Output` `EventEmitter`s

- **onStart:** Emits when the timer starts
- **onStop:** Emits when the timer stops
- **onInterval:** Emits on every timer interval
- **onReset:** Emits when the timer is reset

## Step 5

Implement a `start` method to start a timer using `window.setInterval` and store the returned id in the `currentTimer` property.

The timer should use the `interval` input value as its interval and should update the `currentTime` property with the latest time.
The timer should also emit the latest time at every interval using the `onInterval` output.

Current time can be computed as `currentTime += interval / 1000`

Optional: The method should also emit `currentTime` if a timer hasn't yet been started using the `onStart` output.

## Step 6

Using `window.clearInterval` implement a `stop` method that will stop the current running timer using the stored `currentTimer` id.

Optional: Emit the current time using the `onStop` output.

## Step 7

Implement a `reset` that will reset the `currentTime` to `0` and emit the current time using the `onReset` output

## Step 8

Create a `<app-fare-calculator>` component which will use `<app-timer>` in order to calculate fare based on a given rate.

## Step 9

Add 2 `@Input`s `rate`, and `interval`, and one property `time`

- **rate:** Will be used to calculate the current fare based on time
- **interval:** Will be used to configure `<app-timer>` to use the interval we're interested in
- **time:** Will be used to store the latest time outputted from `<app-timer>`

## Step 10

Implement a `getCurrentFare` method to calculate the current fare based on rate and time.

Fare can be calculated as `(rate * time).toFixed(2)`

And add markup to display the output of `getCurrentFare` in the template

## Step 11

Add `<app-timer>` to the template and pass in the `interval` value.

## Step 12

Add listeners to the `(onInterval)` and `(onReset)` custom events, `(onInterval)` should be an expression or method which updates the `time` property value, and `(onReset)` should be an expression or method which resets the `time` property

## Step 13

Declare properties (of the appropriate types, or appropriately initialized) in `AppComponent` to store the possible options of `<app-fare-calculator>`

## Step 14

Modify the `app.component.html` template file to contain the HTML content of the `<app-fare-calculator>` component and pass in the appropriate values
