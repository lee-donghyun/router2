# router2

## Overview

The Router2 provides a way to manage routing in a React application. It supports history management, dynamic routing, and link creation.

## Getting Started

```
npm install router2
```

## API

### BrowserRouter

The BrowserRouter component is the main component of this library. It uses React Context to provide routing functionality to its children.

```jsx
<BrowserRouter routes={routes} />
```

**Properties**

- `routes`: This is a record object mapping route paths to React components. The "/404" path should be mapped to a component that will be displayed when no other route matches.

**Example**

```jsx
const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/404": () => <NotFoundPage />,
};

<BrowserRouter routes={routes} />;
```

### Link

The Link component creates an anchor element that interacts with the router.

```jsx
<Link pathname="/some-route" query={{ key: "value" }} replace />
```

**Properties**

- `pathname`: The path of the route to navigate to when the link is clicked.
- `query`: An optional object representing the search parameters of the URL.
- `replace`: An optional boolean indicating whether the current history entry should be replaced instead of creating a new entry.
- All other properties of the anchor element are also supported.

**Example**

```jsx
<Link pathname="/about" query={{ key: "value" }} replace>
  About
</Link>
```

### useRouter

The `useRouter` hook returns the current router context.

```jsx
const router = useRouter();
```

The returned object has the following properties:

- `path`: The path of the current route.
- `navigate`: A function to navigate to a different route. It takes a `History` object and an optional options object as parameters.
- `pathname`: The path of the current location.
- `params`: An object representing the URL parameters and search parameters.

**Example**

```jsx
const Component = () => {
  const router = useRouter();
  const handleClick = () => {
    router.navigate({ pathname: "/new-route", query: { key: "value" } });
  };

  return <button onClick={handleClick}>Go to new route</button>;
};
```

## Helper Functions

### matchDynamicRoute

This function checks if a given path matches a dynamic route. It takes the route path and the current pathname as parameters.

### useCreateSingletonRouter

This hook creates a router object. It takes the path of the current route as a parameter. The returned router object is similar to the one returned by the `useRouter` hook.

## Contexts

### historyContext

This context provides the current history state.

### setHistoryContext

This context provides a function to update the history state.

### routerContext

This context provides the router object.

## Types

### History

This type represents a history entry. It has the following properties:

- `pathname`: The path of the location.
- `query`: An optional record object representing the search parameters of the URL.

### RouterProps

This type represents the properties of the BrowserRouter component. It has the following property:

- `routes`: A record object mapping route paths to React components.

### Router

This type represents a router object. It has the following properties:

- `path`: The path of the current route.
- `navigate`: A function to navigate to a different route.
- `pathname`: The path of the current location.
- `params`: An object representing the URL parameters and search parameters.
