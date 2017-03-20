<!--
	Correct answer is 3.

	1 - Similar to 4 below with the caveat that `Http` will not be passed into the constructor to begin with. Providers may only be injected via a typed constructor parameter (or @Inject token).

  4 - While it is possible to instantiate classes manually, (and in some simple, stateless services you may actually get the behaviour you're expecting), manually instantiated classes lose the benefit of Angular's DI (their dependencies are no longer able to be dependency injected) and they require you to manually construct and manage a dependency tree yourself. Additionally,you're overriding the default singleton nature of providers in Angular which may lead to unexpected behaviour.

	2 - It's possible that when students learn that dependencies are injected into a class constructor based on its type, they may expect this type reflection to also apply to class members.
-->
What is the correct way to inject a service into a class?

1.
    ```typescript
    class MyComponent {
      constructor(Http) {
        this.http = new Http();
      }
    }
    ```
1.
    ```typescript
    class MyComponent {
      private http: Http;
    }
    ```
1.
    ```typescript
    class MyComponent {
      constructor(http: Http) {
      }
    }
    ```
1.
    ```typescript
    class MyComponent {
      private http: Http = new Http();
    }
    ```

---

<!--
	Correct answer is 1.

  1 - While an instantiated `Http` service will be available in the constructor, it has not actually been assigned to the class instance and so is now only available inside of the constructor.

	2, 3 - The `private` and `public` keywords in typescript will implicitly assign constructor arguments to the class instance.

	4 - If you do not specify `private` or `public`, you are still able to manually assign a provider instance to a class property.
-->
Which of the below snippets would not assign a service instance to a class member (make it available on `this`)?

1.
    ```typescript
    class MyComponent {
      constructor(http: Http) {
      }
    }
    ```
1.
    ```typescript
    class MyComponent {
      constructor(private http: Http) {
      }
    }
    ```
1.
    ```typescript
    class MyComponent {
      constructor(public http: Http) {
      }
    }
    ```
1.
    ```typescript
    class MyComponent {
      private http: Http;

      constructor(http: Http) {
        this.http = http;
      }
    }
    ```

---

<!--
	Correct answer is 3.

  1, 2 - Services can only be injected once they've been explicitly registered inside of a `providers` array. Angular's DI does not implicitly construct classes on request.
-->
Injecting a service into a class accomplishes which of the following outcomes?

1. A new instance of the service is constructed which is then made available to the class.
1. A new instance of the service is constructed only if it has not been injected before, otherwise an existing instance is reused. The instance of the service is then made available to the class.
1. An existing instance of the service is made available to the class only if it has already been registered in the `providers` array.

---


<!--
	Correct answer is 2.

  1, 3 - Angular CLI will only generate a service and service test file, no corresponding module is created. This may be confused in the case where we're required to import the HttpModule in order to use it.
-->
When generating a service called `MyService` using `angular-cli`, what must be done manually before the service can be used?

1. Import the `MyServiceModule` into the `AppModule`
1. Add `MyService` into the `providers` array
1. Import the `MyServiceModule` into the `AppModule` and add `MyService` into the `providers` array