# Miscellaneous Topics

---

## Component Lifecycle

Angular manages creation, rendering, data-bound properties etc. It also offers hooks that allow us to respond to key lifecycle events.

These are the most-used lifecycle hooks:

- `ngOnInit` - When bound inputs pass values the first time.
- `ngOnDestroy` - Before component is destroyed.
- `ngAfterContentInit` - After component's (ng-)content is initialized.
- `ngAfterViewInit` - After component's view is initialized.

**Pro Tip:** Prefer putting initialization logic in `ngOnInit` instead of `constructor`

[View Example](https://plnkr.co/edit/0hHM5hQJLuuwA8scxAil?p=preview)

---

## Change Detection (Angular 1 vs 2)

![File Structure](content/images/angular1-vs-angular2.jpg)

- Angular 1: Two-way data binding. Nodes traversed one or more times.
- Angular 2: One-way data binding. Nodes traversed once.
