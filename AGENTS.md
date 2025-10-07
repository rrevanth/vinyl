# Repository Guidelines

## Project Structure & Module Organization
`src/app` hosts Expo Router screens and navigation layouts. Core domain logic stays in `src/domain` (entities, DTOs, use cases), while adapters and external integrations live in `src/infrastructure`. Presentation hooks, stores, and shared UI utilities sit in `src/presentation`, and vertically sliced features compose under `src/features`. Assets needed by Expo move to `assets/`, design references in `designs/`, and automation scripts in `scripts/`. Keep tests adjacent to the code they cover using `*.spec.ts` or `*.test.tsx` naming.

## Build, Test, and Development Commands
Use bun for every script: `bun run start` launches Expo locally, while `bun run android`, `bun run ios`, and `bun run web` target specific platforms. Validate TypeScript and linting together with `bun run validate`. Quick checks rely on `bun typecheck && bun lint`, and `bun run validate:fix` applies ESLint fixes and Prettier formatting. If the workspace drifts, execute `bun run reset-project` to restore Expo caches.

## Coding Style & Naming Conventions
TypeScript strict mode is enforced—avoid `any` and casts that hide type issues. Imports for internal modules must use the `@/` alias (for example, `@/src/domain/entities/User`). Follow the Prettier profile (single quotes, no semicolons, 2 spaces, 100 char line width). Compose UI with React Native primitives plus Unistyles `createStyleSheet` and `useStyles`. Manage local UI state through Legend State and server data via TanStack Query. Domain interfaces use an `I` prefix, while errors extend the relevant Domain or Infrastructure base class.

## Testing Guidelines
There is no dedicated automated suite yet; write colocated tests when adding coverage, and name them after the file under test. Always run `bun run validate` before opening a PR, and record manual validation steps in the PR body when automated coverage is missing.

## Commit & Pull Request Guidelines
Commit messages follow `<type>: <imperative summary>` using types such as `feat`, `fix`, `refactor`, or `style`. Keep scope focused and include only reviewed files. PRs must describe the change, link to issues or product requirements, attach screenshots for UI work, and note validation commands. Ensure reviewers can replay steps with `bun run validate` before requesting approval.
