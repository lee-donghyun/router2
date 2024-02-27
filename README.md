# router2

client side router for SPA

## Getting Started

```bash
npm install router2
```

## Usage

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
