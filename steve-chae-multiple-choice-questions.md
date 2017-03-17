<!--
	Correct answer is 2.
	
	1 - NgModule is the name of the Decorator used for any Angular Module.
	I feel one can easily mistake between NgModule and AppModule
	
	3 - while it's possible that the root module can be anything, 
	convention is to name it AppModule and that's what our slides say. 
	This could be a good chance to bring it up that it's convention.
	
	(https://angular.io/docs/ts/latest/guide/appmodule.html)
-->
The name for the root module should be _________.:

1. `NgModule`
1. `AppModule`
1. anything

---

<!--
	Correct answer is 1.
	
	The root module is used exactly for bootstrapping and the boostrap 
	property is specially available to the root module
	
	2, 3, 4 - are also available to other modules and not really special.
	If students pick this maybe we didn't stress the purpose of the root
	module strong enough
	 

-->
Which of the following property is special to the root module?

1. `bootstrap`
1. `declarations`
1. `providers`
1. None. The root module is just like any other modules

---

<!--
	Correct answer is 2.
	
	A Module's elements (as defined in `declrations`) are private by default and need to be "exported" to be public 
	
	1. -- declarations are used to "declare" existence of certain elements
	inside the module. If the student picks this, it could be that the student
	is confused because both `declarations` and `exports` contain a list
	of the Module's elements
	
	3. -- only Services (associated with `providers` property) are public by
	default. If the student picks this, it could be that the student is 
	confused between Module's elements (private by default) and and Services
	(public by default) 

-->
What property is used to make a Module's elements public?

1. `declarations`
1. `exports`
1. A Module's elements are public by default

---
<!--
Correct answer is 2.

In order to use a URL for external template file, one needs to use `templateUrl`

1. -- normally a template will be HTML for web development but can be different,
depending on the platform and setup (SVG, Jade, or even JavaScript). Students can potentially pick this because most examples of Angular Component usage shows templates being HTML
3. -- if the student picks this, could be that the student assumes that it will be some
kind of Object (especially if the student has seen React components and JSX)

-->

Which of the following is *not* true about `template` property in a Component?

1. Doesn't have to be HTML
2. Can be a URL for an external template file
3. The value is just a JavaScript string

---
<!--
Selecting ALL of them is correct.

If the student picks either 3 or 4, it could be that the student forgot that
the "banana in a box" syntax `[()]` is in fact combination of `[]` and `()`

-->
Which of the following is needed to make Two-way data binding work?

1. `@Input` decorator
2. `@Output` decorator
3. `[]` attribute (as in `[hello]="hello!"`)
4. `()`attribute (as in `(click)=sayHi()`)
