# router2

client side router for SPA

```tsx
<BrowserRouter
  routes={{
    "/": Index,
    "/a": A,
    "/a/:about": B, // dynamic routes
    "/b": B,
    "/404": NotFound, // reserved path
  }}
/>
```
