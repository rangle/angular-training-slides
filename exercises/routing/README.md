# Routing Exercise

Complete a small application that shows a list of users or user details depending on the route.


## Step 1

Complete the `RouteConfig` in _*src/app/app.routes.ts*_ by adding a path for the `Home`, `UserListContainer` components

## Step 2

Setup a default route that redirects to the `Home` component

## Step 3

Use the `routerLink` directive in _*src/app/app.component.ts*_ to provide links to Home, UserListContainer. 
Also add a `router-outlet` directive where the components should be displayed.

## Step 4

Modify `UsersList` component so the user names become links to the user detail view, using the `id` on the user object.

## Step 5

Add a route that takes an `:id` parameter to load the `UserDetails` component in _*src/app/app.routes.ts*_

## Step 6

Modify the `UserDetail` component to use the `ActivatedRoute` service to load the correct user details. 
You should now be able to navigate your application to see a list of users and click a user to see their details.

# Displaying user details beside the user list (optional)

## Step 7

Remove the existing route to `UserDetail`. Add two child routes under the user route. Tne first is the default empty path that will show the `UsersHomeComponent`. 
The second path that takes the `:id` and shows the `UserDetail` component.

## Step 8 

In `UsersContainerComponent`, add a `router-outlet` directive to indicate where the child component should be displayed.