# Express Starter

A minimal Express + TypeScript starter repository with Drizzle ORM and PostgreSQL support.

## Overview

This repository demonstrates:
- Express 5 server setup with JSON API routes and server-rendered EJS views
- PostgreSQL integration using Drizzle ORM
- A build process powered by `esbuild` via `build.mjs`
- Database containerization using `docker-compose`

## Repository structure

- `package.json` - project metadata, dependencies, and scripts
- `pnpm-lock.yaml` - lockfile for reproducible installs
- `tsconfig.json` - TypeScript configuration
- `build.mjs` - bundling script for `src/index.ts` into `dist/index.js`
- `docker-compose.yaml` - PostgreSQL service configuration
- `drizzle.config.ts` - Drizzle ORM migration and schema config
- `.env` - runtime configuration for port and database connection
- `dist/` - build output directory
- `migrations/` - Drizzle-generated migration files

### `src/`

- `src/index.ts` - Express application entry point
- `src/db/index.ts` - Drizzle database client configuration
- `src/models/` - Drizzle schema models, including `users`
- `src/controllers/` - business logic and database query helpers
- `src/views/api/` - JSON API routing layer
- `src/views/renderer/` - server-rendered page routes
- `src/public/` - static assets served under `/public`
- `src/templates/` - EJS view templates and partials

### Key directories and files

- `templates/index.ejs` - homepage template
- `templates/users.ejs` - users list page
- `templates/includes/` - shared view fragments
- `templates/partials/` - reusable partials like navbar and user cards

## Get started with `npx degit`

(Note: If you are on Windows, you should run all these commands using `GIT Bash`)

Use `npx degit` to clone the repository without Git history:

```bash
npx degit <github-user>/express-starter express-starter
cd express-starter
```

Replace `<github-user>` with the actual GitHub owner or organization name.

## Install dependencies

This repo includes a `pnpm-lock.yaml`, so `pnpm` is the preferred package manager.However, you can use npm to install dependencies

```bash
pnpm install
```

If you do not have `pnpm`, install it via `corepack` or use `npm install`:

```bash
corepack enable pnpm
pnpm install
```

If you want to use npm to manage dependencies, run the following commands

```bash
rm pnpm-lock.yaml
npm install
```

## Configure environment variables

The repository includes a `.env` file with default settings. Key variables:

- `PORT` - port for the Express server
- `DATABASE_URL` - PostgreSQL connection string used by Drizzle
- `DATABASE_USER` - database user for Docker compose
- `DATABASE_PASSWORD` - database password for Docker compose
- `DATABASE_NAME` - database name for Docker compose

If you modify any values, save them in `.env` before starting the application.

## Start the database

Use Docker Compose to start the local PostgreSQL database:

```bash
docker compose up -d
```

Alternatively, the repository provides a helper script:

```bash
pnpm run db:watch
```

## Run in development mode

```bash
pnpm run dev
```

This starts the app using `tsx watch` and reloads TypeScript source changes automatically.

## Build and run production output

```bash
pnpm run build
pnpm start
```

The build step outputs `dist/index.js`, and `npm start` runs the bundled server.

## Database commands

- `pnpm run db:migrate` — run pending Drizzle migrations
- `pnpm run db:push` — push schema changes directly to the database
- `pnpm run db:studio` — open Drizzle Studio

## Application routes

- `GET /health` — health check endpoint
- `GET /api` — API root status
- `GET /api/users` — return all users as JSON
- `GET /api/users/:id` — return a single user by UUID
- `GET /views` — render homepage
- `GET /views/users` — render the users list page

## Notes

- The Express app uses `ejs` as the templating engine and serves static files from `/public`.
- The database connection is created from `process.env.DATABASE_URL` in `src/db/index.ts`.
- The `build.mjs` script bundles the TypeScript app for production using `esbuild`.

## Useful files to inspect

- `src/index.ts` — Express startup and route wiring
- `src/controllers/user.ts` — user query functions
- `src/db/index.ts` — Drizzle ORM client setup
- `src/models/user.ts` — users table schema
- `src/views/api/user.ts` — API user routes
- `src/views/renderer/user.ts` — rendered user listing route
