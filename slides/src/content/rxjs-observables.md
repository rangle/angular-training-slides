## Search with `flatMap`

Let's say we wanted to add a search feature that makes an http request and updates search results with every keypress event in a text field.
By creating an `Observable` subscribed to events from the input field, and on every change to the input value we perform the HTTP request, which
is also an `Observable`, we create an `Observable` of an `Observable`.

By using `flatMap` we can convert the emissions of these `Observables` then flatten the emissions into a single stream

<img src="content/images/flat-map.png" alt="flat-map-diagram" width="40%" />

[View Example](http://plnkr.co/edit/L6CLXo?p=preview)

---

## Search with `switchMap`

The one downside to using `flatMap` for our search feature is that we will get results for all events in the stream and not necessarily in order.
This would be a huge problem for our search feature as we may not get the latest results back.

`switchMap` solves this problem by only subscribing to the latest event. Any time a new event comes in, `switchMap` will automatically
unsubscribe from the older event to make sure you get the latest results.

<img src="content/images/switch-map.png" alt="flat-map-diagram" width="40%" />

[View Example](http://plnkr.co/edit/FYLTcx?p=preview)

---
