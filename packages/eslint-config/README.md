# @repo/eslint-config 📦

This package contains shared ESLint configurations for your Turborepo monorepo. It centralizes all ESLint configurations, eliminating the need to install and configure ESLint separately in each workspace.

## 📚 Available Configurations

### Base Configuration 🧱

The base configuration provides standard linting rules for TypeScript projects, with:

- Recommended ESLint settings
- TypeScript ESLint recommended rules
- Prettier integration for consistent formatting
- Turbo-specific rules for environment variables
- All rules defaulting to "warn" severity with eslint-plugin-only-warn
- Ignores for build outputs (dist folder)

### React Configuration ⚛️

The React configuration extends the base configuration with:

- React-specific rules
- React Hooks rules
- Browser and ServiceWorker globals
- JSX support
- Disables unnecessary React import for modern JSX transform

### Next.js Configuration 🔄

The Next.js configuration offers a complete setup for Next.js projects:

- Everything from the base configuration
- React rules and hooks
- Next.js specific rules and core web vitals
- Proper import sorting
- Prettier integration
- Global ServiceWorker types
- TypeScript consistency rules
- Build folder ignores (.next)

## 📝 Usage

Create an `eslint.config.js` file in your workspace root:

### For a base TypeScript project:

```js
import { config } from "@repo/eslint-config/base";

export default [...config];
```

### For a React project:

```js
import { config as reactConfig } from "@repo/eslint-config/react-internal";

export default [...reactConfig];
```

### For a Next.js project:

```js
import { nextJsConfig } from "@repo/eslint-config/nextjs";

export default [...nextJsConfig];
```

## ⚙️ Adding ESLint to scripts

You can add ESLint to your package.json scripts:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

## 🔄 Customizing

You can extend any configuration to add your own workspace-specific rules:

```js
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    rules: {
      // Your custom rules here
      "no-console": "warn",
    },
  },
];
```

## 🧩 Included Plugins & Their Purpose

### Base Configuration Plugins

| Plugin                         | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| 📏 **@eslint/js**              | Provides the new ESLint flat config format and recommended JavaScript rules         |
| 🔍 **typescript-eslint**       | TypeScript-specific linting rules to catch common errors and enforce best practices |
| 💅 **eslint-config-prettier**  | Turns off all rules that are unnecessary or might conflict with Prettier            |
| 🚀 **eslint-plugin-turbo**     | Validates environment variables used in Turborepo pipelines                         |
| ⚠️ **eslint-plugin-only-warn** | Downgrades all errors to warnings for a less intrusive development experience       |

### React Configuration Plugins (includes all base plugins, plus:)

| Plugin                           | Description                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------- |
| ⚛️ **eslint-plugin-react**       | React-specific linting rules for best practices and common mistakes             |
| 🪝 **eslint-plugin-react-hooks** | Enforces the Rules of Hooks for consistent React Hooks usage                    |
| 🌐 **globals**                   | Provides global variable definitions for browser and ServiceWorker environments |

### Next.js Configuration Plugins (includes all React plugins, plus:)

| Plugin                                  | Description                                                              |
| --------------------------------------- | ------------------------------------------------------------------------ |
| 🔄 **@next/eslint-plugin-next**         | Next.js-specific rules including core web vitals optimization            |
| 📦 **eslint-plugin-import**             | Helps validate proper imports, exports, and module usage                 |
| 🔤 **eslint-plugin-simple-import-sort** | Automatically sorts import statements for better readability             |
| 🎨 **eslint-plugin-prettier**           | Runs Prettier as an ESLint rule and reports differences as ESLint issues |

## 🔧 Key Rules Explained

### Base Configuration Rules

- `turbo/no-undeclared-env-vars`: Warns when environment variables used in Turbo pipelines aren't properly declared
- TypeScript rules focus on type safety and preventing common errors

### React Rules

- `react/react-in-jsx-scope`: Turned off as it's not needed with the new JSX transform
- `react-hooks/*`: Ensures hooks are called in the correct order and only at the top level

### Next.js Rules

- Next.js core web vitals rules focus on performance optimizations
- `simple-import-sort/imports` and `simple-import-sort/exports`: Ensures consistent import/export ordering
- `@typescript-eslint/consistent-type-imports`: Enforces using `import type` for type imports
- `prettier/prettier`: Ensures code formatting matches Prettier configuration

## 🛠️ Setup

1. In the root of your monorepo, make sure this package is properly installed:

   ```bash
   pnpm install
   ```

2. Reference this package in your workspace's package.json:
   ```json
   "devDependencies": {
     "@repo/eslint-config": "workspace:*"
   }
   ```

## 📝 Usage

Create an `eslint.config.js` file in your workspace root:

### For a base TypeScript project:

```js
import { config } from "@repo/eslint-config/base";

export default [...config];
```

### For a React project:

```js
import { config as reactConfig } from "@repo/eslint-config/react-internal";

export default [...reactConfig];
```

### For a Next.js project:

```js
import { nextJsConfig } from "@repo/eslint-config/nextjs";

export default [...nextJsConfig];
```

## ⚙️ Adding ESLint to scripts

You can add ESLint to your package.json scripts:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

## 🔄 Customizing

You can extend any configuration to add your own workspace-specific rules:

```js
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    rules: {
      // Your custom rules here
      "no-console": "warn",
    },
  },
];
```

## 🌟 Benefits

- **🔄 Centralized configuration**: Update linting rules once, apply everywhere
- **✨ Consistent code style**: Ensure all workspaces follow the same standards
- **⏱️ Reduced setup time**: No need to configure ESLint in each workspace
- **🛠️ Simplified maintenance**: Dependencies are managed in one place
- **🚀 Optimized performance**: Shared ESLint instance improves monorepo build times

## 📜 License

MIT

## Usage

Create an `eslint.config.js` file in your workspace root:

### For a base TypeScript project:

```js
import { config } from "@repo/eslint-config/base";

export default [...config];
```

### For a React project:

```js
import { config as reactConfig } from "@repo/eslint-config/react-internal";

export default [...reactConfig];
```

### For a Next.js project:

```js
import { nextJsConfig } from "@repo/eslint-config/nextjs";

export default [...nextJsConfig];
```

## Adding ESLint to scripts

You can add ESLint to your package.json scripts:

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
}
```

## Customizing

You can extend any configuration to add your own workspace-specific rules:

```js
import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    rules: {
      // Your custom rules here
      "no-console": "warn",
    },
  },
];
```

## Benefits

- **Centralized configuration**: Update linting rules once, apply everywhere
- **Consistent code style**: Ensure all workspaces follow the same standards
- **Reduced setup time**: No need to configure ESLint in each workspace
- **Simplified maintenance**: Dependencies are managed in one place

## License

MIT
