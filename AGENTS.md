# VNYL Development Guide for Coding Agents

## Build Commands

- **Validate**: `bun typecheck && bun lint` (REQUIRED after every change)
- **Auto-fix**: `bun lint --fix && prettier --write "src/app/**/*.{ts,tsx,js,jsx}"`
- **Run**: `bun start` | `bun android` | `bun ios` | `bun web`
- **Package Manager**: Use `bun` for all commands (not npm/yarn)

## Code Style & Standards

- **Imports**: Always use `@/` prefix for internal modules (`import { User } from '@/src/domain/entities/User'`)
- **Components**: React Native primitives only (View, Text, Pressable) - NO external UI libraries
- **Styling**: Use Unistyles (`createStyleSheet`, `useStyles`) for theming, never StyleSheet.create()
- **State**: Legend State for UI/app state, TanStack Query for server state
- **Types**: TypeScript strict mode - never use `any`, avoid `@ts-ignore`
- **Formatting**: Prettier config: single quotes, no semicolons, 100 char width, 2 spaces

## Architecture (CLEAN)

- **Domain**: Business entities, interfaces (`I` prefix), use cases, domain errors
- **Infrastructure**: Implementations (no `Impl` suffix), HTTP clients, storage, DI container
- **Presentation**: React components, screens, feature stores, hooks
- **DI Pattern**: All services via container, use `useService<IService>(TOKENS.Service)` in components

## Error Handling & Validation

- **Validation Gate**: Run `bun typecheck && bun lint` after EVERY change
- **Errors**: Domain errors extend DomainError, Infrastructure errors extend InfrastructureError
- **Never**: Skip validation, disable ESLint rules, or use type assertions to bypass errors
- **Fix Properly**: Address root cause, don't suppress with ignore comments

## Key Patterns

- Pass complete objects (not IDs) between layers and navigation
- Use Legend Motion for animations, Legend List for virtualized lists
- All text via i18n keys (snake_case), no hardcoded strings
- Accessibility props required on interactive elements
- 44pt minimum touch targets
