# Nexus Obra – Gestão de Obra Client

Client-side application for **Nexus Obra**, a multi-tenant construction management system (Gestão de Obra). Users can manage clients, obras (projects), and orçamentos (quotations) with role-based access control.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** – build tool and dev server
- **React Router 7** – routing
- **Axios** – HTTP client
- **SASS** – styling (CSS Modules)
- **React Toastify** – notifications

## Features

- **Authentication** – login, logout, password reset
- **Server-authoritative session bootstrap** – app restores auth state via backend (`GET /users/me`)
- **Role-based access** – `masterAdmin`, `Admin`, `user`, `guest`
- **Protected routes** – client-scoped access for non-admin users
- **Scoped obra routing** – canonical routes use `/:clientId/allobras` and `/:clientId/addobra`
- **Legacy route compatibility** – `/allobras` and `/addobra` redirect to scoped tenant routes
- **Client management** (masterAdmin) – create, list, edit, delete clients
- **Client logo** – fetched from backend, displayed in navbar
- **Dashboard** – per-client dashboard with links to obras and orçamentos
- **Master Dashboard** – admin overview and client management entry points

### User Roles

| Role        | Access                                                              |
| ----------- | ------------------------------------------------------------------- |
| masterAdmin | Master Dashboard, client list, add/edit clients, full system access |
| Admin       | Client-specific dashboard, obras, orçamentos, team management       |
| user        | Home, Profile                                                       |
| guest       | Login only                                                          |

## Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── BuildList.tsx   # Legacy builds page (placeholder)
│   ├── ClientList.tsx  # Client list (masterAdmin)
│   ├── CreateClient.tsx
│   ├── CreateObra.tsx
│   ├── EditClient.tsx
│   ├── EditObra.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ManageObra.tsx
│   ├── Navbar.tsx      # Role-based navigation
│   ├── ObraList.tsx
│   ├── ProtectedRoute.tsx
│   └── QuotationList.tsx # Orçamentos list (placeholder)
├── config/
│   └── roleConfig.ts   # Role definitions and nav actions
├── contexts/
│   ├── authContext.ts
│   └── authProvider.tsx
├── hooks/
│   └── useAuth.ts
├── Pages/
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── MasterDashboard.tsx
│   ├── PasswordUpdatePage.tsx
│   └── WelcomePage.tsx
├── sass/               # SCSS modules
├── styles/             # Compiled CSS modules
└── types/
    └── auth.ts
```

## Getting Started

### Prerequisites

- Node.js **22.12.x (recommended)** or **20.19+**
- pnpm 9+

> Runtime normalization (Phase 1) is enabled via `scripts/runtimePreflight.mjs` and `.nvmrc`/`.node-version`. For best test stability, use Node `22.12.0`.

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=http://localhost:5005
```

> **Note:** Vite exposes only variables prefixed with `VITE_` to the client. The backend URL defaults to `http://localhost:5005` if not set.

### Development

```bash
pnpm dev
```

Runs the app at [http://localhost:5173](http://localhost:5173) (or the next available port).

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Routes

| Path                     | Access                                           | Description                           |
| ------------------------ | ------------------------------------------------ | ------------------------------------- |
| `/`                      | Public                                           | Welcome page                          |
| `/login`                 | Public                                           | Login form                            |
| `/masterdash`            | masterAdmin                                      | Master dashboard                      |
| `/allclients`            | masterAdmin                                      | Client list                           |
| `/addclient`             | masterAdmin                                      | Create client                         |
| `/editclient/:clientId`  | masterAdmin / client match                       | Edit client                           |
| `/dashboard/:clientId`   | Admin (client match)                             | Client dashboard                      |
| `/allobras`              | Authenticated                                    | Legacy redirect to scoped obras       |
| `/addobra`               | Authenticated                                    | Legacy redirect to scoped create obra |
| `/:clientId/allobras`    | Authenticated (client match for non-masterAdmin) | Canonical obras list                  |
| `/:clientId/addobra`     | Authenticated (client match for non-masterAdmin) | Canonical create obra                 |
| `/editobra/:obraId`      | Authenticated                                    | Edit obra                             |
| `/manageobra/:obraId`    | Authenticated                                    | Manage obra + invoices                |
| `/builds`                | Authenticated                                    | Legacy placeholder builds page        |
| `/quotations`            | Authenticated                                    | Legacy placeholder quotations page    |
| `/resetpassword/:userId` | Authenticated                                    | Password reset                        |

## Auth & Session Model

- Login sets an httpOnly auth cookie from backend.
- On app initialization, auth state is restored via backend profile endpoint (`GET /users/me`).
- Persisted local client metadata is not treated as authorization source of truth.

## Design & Styling

- **Design system:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) – NexusObra palette, typography, components
- **Implementation guide:** [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) – how to use SASS modules and mixins

## Backend

This client expects a backend API. Ensure the backend is running and reachable at the URL configured in `VITE_BACKEND_URL`.

## License

Private project.

## Docker

This repo includes its own Docker setup (`Dockerfile` + `docker-compose.yml`).

### Compose (repo-local)

From `Client/`:

```bash
cp .env.docker.example .env
docker compose up --build
```

- Client app: `http://localhost:8080`
- Backend target is controlled by `VITE_BACKEND_URL` (default: `http://localhost:5005`)

If your backend runs from a separate repository/container, set `VITE_BACKEND_URL` accordingly in `.env` before building.

### Client image only

From `Client/`:

```bash
docker build -t nexus-obra-client --build-arg VITE_BACKEND_URL=http://localhost:5005 .
docker run --rm -p 8080:80 nexus-obra-client
```

For version tagging and rollback flow, see [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md).
