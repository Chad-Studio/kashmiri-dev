# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `language.tsx` | layout for `/language` — must render `<Outlet />` |
| `language.index.tsx` | `/language` |
| `language.numbers.tsx` | `/language/numbers` |
| `posts_.$postId.tsx` | `/posts/:postId` without nesting under `posts` |
| `_layout.tsx` | pathless layout (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

A parent file with children (`language.tsx` + `language.index.tsx`) is a layout. Put shared chrome there and render `<Outlet />`. Do not put the index page in the parent file — visiting a child URL will then show the parent page and hide the child.

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.
