# router2

Client side routing for React applications. Inspired by Next.js.

It supports history management, dynamic routing, and link creation.

**This npm package provides TypeScript files, and it is your responsibility to build and bundle it.**

<details>
<summary>But Why?</summary>

This library is designed to be as simple as possible. It does not include any dependencies, making it easy to understand and modify. Additionally, this approach results in a smaller bundle size.

</details>

<details>
<summary>I need a bundled version.</summary>

You can still fork the library and modify the `package.json`. For configuration details, see [rollup.config.js](rollup.config.js).

To build the package, run:

```sh
npm run build
```

Update your `package.json` like this:

```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js"
}
```

</details>

## Overview

```js
const { push, replace, route } = useRouter();

push({ pathname: "/new-route" });

console.log(route);
// {
//   path: "/new-route",
//   pathname: "/new-route",
//   params: {},
// }
```

```ts
const { push, replace, route } = useRouter();

replace({ pathname: `/dynamic-route/${12}`, query: { key: "value" } });

console.log(route);
// {
//   path: "/dynamic-route/12",
//   pathname: "/dynamic-route/:id",
//   params: { ":id": "12", key: "value" },
// }
```

## Getting Started

```
npm install router2
```

## Components

### BrowserRouter

The BrowserRouter component is the main component of this library. It uses React Context to provide routing functionality to its children.

```jsx
<BrowserRouter routes={routes} />
```

#### Properties

- `routes`: This is a record object mapping route paths to React components. The "/404" path should be mapped to a component that will be displayed when no other route matches.
- `config`: This is an optional object that can be used to configure the router's behavior. It supports the following properties:
  - `on`: An object containing event handlers for various router events. The supported events are:
    - `beforePush`: Called before the router pushes a new state to the history. It receives an event object and a `next` callback function.
    - `afterPush`: Called after the router pushes a new state to the history. It receives an event object.
    - `beforeReplace`: Called before the router replaces the current state in the history. It receives an event object and a `next` callback function.
    - `afterReplace`: Called after the router replaces the current state in the history. It receives an event object.
    - `beforeBack`: Called before the router handles a back event. It receives an event object and a `next` callback function.
    - `afterBack`: Called after the router handles a back event. It receives an event object.
    - `beforeFoward`: Called before the router handles a forward event. It receives an event object and a `next` callback function.
    - `afterFoward`: Called after the router handles a forward event. It receives an event object.

#### Example

##### Use routes object

```jsx
const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/404": () => <NotFoundPage />,
};

<BrowserRouter routes={routes} />;
```

##### Use children

```jsx
const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/404": () => <NotFoundPage />,
};

<BrowserRouter routes={routes}>
  {(Page) => (
    <InRouterContextProvider>
      <Page />
    </InRouterContextProvider>
  )}
</BrowserRouter>;
```

##### Scroll Restoration Example

```jsx
const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/404": () => <NotFoundPage />,
};

const scroll = new Map();

const config = {
  on: {
    afterReplace: (event) => {
      globalThis.scrollTo({
        top: scroll.get(event.current.pathname) ?? 0,
      });
    },
    afterPush: (event) => {
      globalThis.scrollTo({
        top: scroll.get(event.current.pathname) ?? 0,
      });
    },
    beforeReplace: (event, next) => {
      scroll.set(event.prev.pathname, window.scrollY);
      next();
    },
    beforePush: (event, next) => {
      scroll.set(event.prev.pathname, window.scrollY);
      next();
    },
    afterBack: (event) => {
      globalThis.scrollTo({
        top: scroll.get(event.current.pathname) ?? 0,
      });
    },
    beforeBack: (event, next) => {
      scroll.set(event.prev.pathname, window.scrollY);
      next();
    },
    afterFoward: (event) => {
      globalThis.scrollTo({
        top: scroll.get(event.current.pathname) ?? 0,
      });
    },
    beforeFoward: (event, next) => {
      scroll.set(event.prev.pathname, window.scrollY);
      next();
    },
  },
};

<BrowserRouter routes={routes} config={config} />;
```

##### View Transition Example

```jsx
const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/404": () => <NotFoundPage />,
};

const config = {
  on: {
    beforeNavigate: (event, next) => {
      document.startViewTransition(() => {
        next();
      });
    },
  },
};

<BrowserRouter routes={routes} config={config} />;
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

## API

### useRouter

The `useRouter` hook returns the router object.

```jsx
const router = useRouter();
```

Returns [`Router`](#router) object.

#### Router

This type represents a router object. It has the following properties:

- `path`: The path of the current route.
- `push`: A function to navigate to a different route by pushing a new state to the history. It takes a [`History`](#history) object as a parameter.
- `replace`: A function to navigate to a different route by replacing the current state in the history. It takes a [`History`](#history) object as a parameter.
- `pathname`: The path of the current location.
- `params`: An object representing the URL parameters and search parameters.

#### History

This type represents a history entry. It has the following properties:

- `path`: The path of the current route.
- `pathname`: The pathname of the location.
- `query`: An optional record object representing the search parameters of the URL.

## Contributing

Feel free to contribute to this project by submitting issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
