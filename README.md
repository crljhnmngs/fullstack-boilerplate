# Fullstack Boilerplate

A modern fullstack boilerplate for rapid web application development, featuring a React (Vite) frontend and an Express (TypeScript) backend.

## Features

- **Frontend:** React 18, Vite, TailwindCSS, Shadcn, Zustand, TanStack Query, Zod validation, TailAdmin (admin UI), modular component structure
- **Backend:** Express.js, TypeScript, MongoDB, JWT authentication, modular architecture
- **Media & Email Services:**
    - **Cloudinary** – file/image upload and storage
    - **Nodemailer** – transactional email support
- **Monorepo:** Shared scripts for client and server, managed from the root
- **Developer Experience:** Prettier, ESLint, Husky, Commitlint, VSCode launch configs
- **Dockerized:** Ready for containerized development and deployment
- **CI/CD:** GitHub Actions for linting, dependency review, security, and audit

## Project Structure

```
.
├── client/         # React frontend (Vite, TailwindCSS, TailAdmin admin UI)
├── server/         # Express backend (TypeScript, MongoDB)
├── .github/        # GitHub Actions workflows
├── .husky/         # Git hooks (pre-commit, commit-msg)
├── .vscode/        # VSCode settings and launch configs
├── docker-compose.yml
├── package.json    # Monorepo scripts
├── README.md
└── ...
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Docker (optional, for containerized setup)
- MongoDB (local or cloud)

### Installation

Install all dependencies for both client and server:

```sh
npm run install
```

### Development

Start both client and server with hot reload:

```sh
npm run start
```

- Client: http://localhost:3000
- Server: http://localhost:8080

Or run individually:

```sh
npm run start:client
npm run start:server
```

### Environment Variables

Copy `.env.template` to `.env` in the root, `client/`, and `server/` directories. Fill in the required values.

### Linting & Formatting

```sh
npm run lint
```

## Scripts

See [package.json](package.json) for all available scripts.

## VSCode Debugging

Use the included [`.vscode/launch.json`](.vscode/launch.json) for debugging both client and server.

## Docker

To run the stack with Docker:

```sh
docker-compose up --build
```

## Security & Quality

This repo includes GitHub Actions workflows for:

- 🔒 **CodeQL** – semantic code analysis for vulnerabilities
- 🕵️ **Gitleaks** – scans for secrets in code
- 📦 **Dependency Review** – checks added packages for risks
- 🛠 **npm Audit** – alerts on known vulnerabilities
- ✅ **CI** – runs lint and build steps on every PR

![CI](https://github.com/crljhnmngs/fullstack-boilerplate/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/crljhnmngs/fullstack-boilerplate/actions/workflows/codeql.yml/badge.svg)

## License

ISC

---

> Boilerplate by Carl John G. Manigos
