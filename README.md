# router2

client side router for SPA

```tsx
<BrowserRouter
  routes={{
    "/": Index,
    "/a": A, // dynamic routes
    "/a/:about": B,
    "/b": B,
    "/404": NotFound, // reserved path
  }}
/>
```
