# Turborepo Template

A modern fullstack project setup built with Turborepo for efficient monorepo management.

## 🚀 Features

- **Monorepo structure** with Turborepo for efficient building and dependency management
- **Next.js** app for frontend
- **Prisma ORM** for database communication
- **TypeScript** support throughout the project
- **ESLint** and **Prettier** configuration for code standards
- **Docker** for local development environment
- **GitHub Actions** for CI/CD
- **Husky & lint-staged** for automatic linting and formatting on commits

## 📂 Project Structure

```
TURBO-TEMPLATE/
├── .cursor/            # Cursor AI configuration
├── .github/            # GitHub Actions workflows
├── .vscode/            # VS Code configuration
├── apps/               # Applications
│   └── web/            # Next.js web application
│       ├── app/        # App router components
│       ├── styles/     # CSS and Tailwind configuration
│       └── ...         # Configuration files for Next.js
├── packages/           # Shared packages
│   ├── db/             # Database layer (Prisma)
│   │   ├── generated/  # Prisma-generated types
│   │   ├── prisma/     # Prisma schema and migrations
│   │   └── queries/    # Database queries
│   ├── eslint-config/  # Shared ESLint configurations
│   ├── next-config/    # Shared Next.js configurations
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/             # UI components
├── docker-compose.yml  # Docker configuration for local development
├── package.json        # Root package.json for Turborepo
└── turbo.json          # Turborepo configuration
```

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MySQL with Prisma ORM
- **Development Tools**: ESLint, Prettier, Turborepo, Docker, Husky (Git hooks)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Docker and Docker Compose

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/turbo-template.git
   cd turbo-template
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Initialize Husky (Git hooks)

   ```bash
   pnpm run prepare
   ```

   > **Important**: This step is necessary to activate Git hooks for linting and formatting code before commits.

4. Copy example environment variables

   ```bash
   cp .env.example .env
   cp packages/db/.env.example packages/db/.env
   cp apps/web/.env.example apps/web/.env
   ```

5. Start the database with Docker

   ```bash
   docker compose up -d
   ```

6. Run Prisma migrations

   ```bash
   cd packages/db
   npx prisma migrate dev
   ```

7. Start the development server
   ```bash
   cd ../..
   pnpm dev
   ```

## 🔒 Git Hooks with Husky

The project uses Husky and lint-staged to automate code checking on commits:

- **Pre-commit hook**: Automatically runs ESLint and Prettier on changed files before each commit
- **Commit-msg hook**: Validates commit messages against the [Conventional Commits](https://www.conventionalcommits.org/) format

If Husky doesn't run automatically, make sure you've run `pnpm run prepare` after installation.

### Troubleshooting Husky

If Git hooks aren't running:

1. Make sure the prepare script has run: `pnpm run prepare`
2. Check that hook files have execution permissions:
   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/commit-msg
   ```
3. Verify Git is configured correctly: `git config core.hooksPath .husky`

## 🐳 Docker Configuration

The project uses Docker Compose to run a MySQL 8.0 database locally:

```yaml
volumes:
  database:
    driver: local

services:
  mysql:
    platform: linux/amd64
    image: mysql:8.0.32
    container_name: turborepo_mysql
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_DATABASE: turborepo
      MYSQL_ALLOW_EMPTY_PASSWORD: 1
    volumes:
      - database:/var/lib/mysql

networks:
  app_network:
    external: true
```

This configuration:

- Sets up a MySQL 8.0.32 database on port 3306
- Creates a database named 'turborepo'
- Allows empty password for simple development
- Stores database files in a Docker volume that persists between restarts
- Sets up a network for communication between containers

Prisma is configured to connect to this database via the connection string in `packages/db/.env`:

```
DATABASE_URL="mysql://root:@localhost:3306/turborepo"
```

## 🧩 Useful Commands

```bash
# Start development servers
pnpm dev

# Build all packages and apps
pnpm build

# Run linting on all packages and apps
pnpm lint

# Format code with Prettier
pnpm format

# Start or stop Docker containers
docker compose up -d
docker compose down
```

## 📝 VS Code Configuration

The project comes with a ready-made setup for VS Code with recommended extensions and settings for optimal development.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the [MIT License](LICENSE).
