# Product Context

This file provides a high-level overview of the VNYL project and the expected product. Based on project documentation and source code analysis.

2025-10-03 16:23:15 - Initial Context Bank creation with comprehensive project analysis.

---

## Project Goal

**VNYL** is a React Native streaming media application built with Expo 54, designed to provide a unified interface for discovering and streaming video content from multiple sources, with planned integration of Stremio addon ecosystem.

### Primary Objectives
1. **Media Discovery**: Aggregate content from TMDB, Trakt, and Stremio addons
2. **Stream Resolution**: Find playable streams across multiple addon sources
3. **Unified Experience**: Single interface for all content discovery and playback
4. **Extensibility**: Support for community Stremio addons

---

## Key Features

### Planned Core Features
- **Multi-source Search**: Unified search across TMDB, Trakt, and Stremio
- **Stream Discovery**: Primary value proposition - finding playable content
- **Stremio Integration**: Multi-addon aggregation with fault tolerance
- **Subtitle Support**: Multilingual subtitles from addon ecosystem
- **Content Metadata**: Rich metadata from specialized sources
- **User Collections**: Library management and tracking
- **Settings**: Theme, language, and user preferences

### Tab Navigation Structure
1. **Home**: Content discovery and recommendations
2. **Search**: Multi-source content search
3. **Library**: User collections and watch history
4. **Settings**: App preferences and configuration

---

## Overall Architecture

### CLEAN Architecture (3-Layer)

```
┌─────────────────────────────────────────┐
│  PRESENTATION (UI & State)              │
│  - React Native components              │
│  - Legend State stores                  │
│  - TanStack Query caching               │
│  - Unistyles theming                    │
│  - Expo Router navigation               │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  DOMAIN (Business Logic)                │
│  - Entities (pure objects)              │
│  - Repository interfaces                │
│  - Service interfaces                   │
│  - Use cases (business rules)           │
│  - Domain errors                        │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  INFRASTRUCTURE (External Systems)      │
│  - Repository implementations           │
│  - Service implementations              │
│  - HTTP clients (Axios)                 │
│  - Storage (AsyncStorage)               │
│  - DI Container                         │
└─────────────────────────────────────────┘
```

### Technology Stack

**Core Technologies:**
- Expo 54 with latest features
- React Native 0.81.4 with TypeScript strict mode
- Bun package manager
- Unistyles 3.0.13 (centralized theming)
- Expo Router 6.0.10 (file-based routing)

**Planned State Management:**
- Legend State (observable state, NOT YET INSTALLED)
- TanStack Query (data fetching & caching, NOT YET INSTALLED)
- Legend Motion (animations, NOT YET INSTALLED)
- Legend List (virtualization, NOT YET INSTALLED)

**Data Layer:**
- Axios 1.12.2 with axios-retry
- AsyncStorage 2.2.0
- Bearer token authentication

---

## Current Implementation Status

### ✅ Completed Infrastructure
- Domain error types (4 types)
- Service interfaces (Storage, Logging, Theme, I18n)
- Theme tokens (colors, spacing, typography)
- DI Container with token system
- Core service implementations
- HTTP Client with retry logic
- Unistyles configuration
- Tab navigation shell

### ❌ Missing Critical Components
- Legend State, TanStack Query, Motion, List (dependencies)
- Atomic design UI components (atoms/molecules/organisms)
- i18n translation system
- Domain entities (Media, User, etc.)
- Repository implementations
- Use cases (business logic)
- Feature implementations (all 4 tabs empty)

### Architecture Gaps
```
Missing Directories:
src/presentation/shared/ui/atoms/
src/presentation/shared/ui/molecules/
src/presentation/shared/ui/organisms/
src/presentation/shared/stores/
src/presentation/shared/hooks/
src/presentation/shared/i18n/
src/domain/entities/
src/domain/repositories/
src/domain/use-cases/
src/infrastructure/repositories/
src/infrastructure/mappers/
```

---

## Development Standards

### Critical Rules (from CLAUDE.md)
1. **@ Import Pattern**: All internal imports use @ aliases
2. **Native Components Only**: View, Text, Pressable, StyleSheet.create()
3. **Validation Gates**: `bun typecheck && bun lint` required after every change
4. **No External UI Libraries**: Build with React Native primitives only
5. **DI Everywhere**: Never instantiate services directly
6. **Pass Complete Objects**: Never pass just IDs between layers
7. **i18n Required**: No hardcoded text, all translation keys
8. **Accessibility**: Proper roles, labels, 44pt touch targets

### Naming Conventions
- Interfaces: `I` prefix (IUserRepository) OR `.interface.ts` suffix
- Implementations: Normal names, NO `Impl` suffix
- Translation keys: snake_case (settings.theme.dark_mode)

---

2025-10-03 16:23:15 - Context Bank initialized with complete project analysis.