# Geocart

Georgian marketplace discovery UI built with Next.js.

## Architecture

The project mirrors the surrounding React app structure while using Next App Router:

- `src/app` - Next routes and root layout.
- `src/app-shell` - application shell, design tokens, feature pages, and reusable UI.
- `src/domain` - domain entities and enums.
- `src/data` - gateways, DTO helpers, and screen data.
- `src/network` - shared HTTP client.
- `src/di` - Inversify container and React provider.
- `src/utils` - shared utility helpers.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run generate:openapi
```

The same workflow is available through Make:

```bash
make dev
make build
make analyze
make generate_openapi
make check
```

## OpenAPI

`npm run generate:openapi` generates TypeScript models and Axios request functions from `openapi.yaml` into `src/data/openapi`.

Generated requests use the `/api/v1` server prefix from the OpenAPI schema. Set `NEXT_PUBLIC_API_BASE_URL` to the API host root, for example `https://api.example.com`.
