# CLAUDE.md

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint:fix     # Lint and auto-fix
pnpm typecheck    # Run type checking
pnpm test run     # Run all tests once
pnpm test:unit    # Run unit tests only
pnpm test:nuxt    # Run nuxt tests only
pnpm test:server  # Run server tests only
```

## Architecture

- **Nuxt 4** with Vue 3, TypeScript, Tailwind CSS 4, Nuxt UI
- **i18n**: `@nuxtjs/i18n` — locale files in `i18n/locales/`
- **Linting**: ESLint via `@nuxt/eslint`
- **Package manager**: pnpm (strict engine policy)

## Directory Structure

```
app/           → Vue pages, components, composables, assets
server/        → Nitro server routes, middleware, utils
shared/        → Code shared between app and server
i18n/locales/  → Translation JSON files
public/        → Static assets
```

## Test Structure (Vitest)

Three co-located test projects:

| Project  | Pattern                            | Environment |
|----------|------------------------------------|-------------|
| **unit** | `app/**/*.{test,spec}.ts` + `shared/**/*.{test,spec}.ts` (excludes `*.nuxt.*`) | node |
| **nuxt** | `app/**/*.nuxt.{test,spec}.ts`     | nuxt        |
| **server** | `server/**/*.{test,spec}.ts`     | node        |

- Unit tests live next to the code they test
- Nuxt integration tests use the `.nuxt.test.ts` suffix
- Server tests live inside `server/`

## Layer Boundaries

- `app/` may import from `shared/` but never from `server/`
- `server/` may import from `shared/` but never from `app/`
- `shared/` must not import from `app/` or `server/`
