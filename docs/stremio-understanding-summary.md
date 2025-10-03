# Stremio Understanding & Integration Summary

## How Stremio Works

Stremio is a **decentralized streaming platform** that uses an **addon system**
to provide content discovery and streaming capabilities. Unlike traditional
streaming services with centralized catalogs, Stremio aggregates content from
multiple independent addons.

### Core Architecture

```
Stremio App ←→ Multiple Addons ←→ Content Sources
     ↑              ↑                    ↑
   User UI      HTTP APIs         (Torrents, Debrid,
                                   Direct Links, etc.)
```

### Key Concepts

1. **Addons are HTTP Services**: Each addon is a standalone web service with
   standardized REST endpoints
2. **Manifest-First**: Every addon declares its capabilities via a
   `manifest.json` file
3. **Resource-Based**: Addons provide different types of resources (catalogs,
   streams, metadata, subtitles)
4. **Content Type Agnostic**: Supports movies, series, TV channels, events,
   anime, and custom types
5. **ID Prefix System**: Uses prefixes like "tt" (IMDb), "tmdb" (TMDB) to handle
   different identifier formats

## Addon System Deep Dive

### Manifest Structure

Every addon starts with a manifest that declares:

- **Identity**: id, name, version, description
- **Capabilities**: supported resources, content types, ID prefixes
- **Catalogs**: available content categories (Popular, Recent, etc.)
- **Behavior**: configuration options, adult content flags, etc.

### Resource Types

- **catalog**: Content discovery (browseable lists)
- **meta**: Detailed metadata for individual items
- **stream**: Playable URLs and streaming information
- **subtitles**: Subtitle files in various languages
- **addon_catalog**: Discovery of other addons

### Content Flow

1. **Discovery**: App fetches addon manifests to understand capabilities
2. **Catalog Browsing**: Users browse content from multiple addon catalogs
3. **Metadata Enrichment**: App fetches detailed info when user selects content
4. **Stream Resolution**: When user wants to play, app queries addons for
   streams
5. **Playback**: App plays the resolved stream URL

## Real-World Examples Analysis

### 1. AIO Streams (Complex Aggregator)

- **Type**: Meta-addon that aggregates multiple services
- **Features**: Debrid service integration, extensive filtering, proxy support
- **Resources**: Catalogs, streams, metadata, subtitles
- **Innovation**: Consolidates multiple Stremio addons into single interface

### 2. Cinemeta (Official Catalog)

- **Type**: Official metadata and catalog provider
- **Features**: Comprehensive movie/TV catalogs with genre filtering
- **Resources**: Catalogs, metadata, addon discovery
- **Role**: Primary content discovery and metadata source

### 3. Hanime (Specialized Content)

- **Type**: Niche content provider with custom catalogs
- **Features**: Adult content, custom genres, specialized sorting
- **Resources**: Catalogs, streams, metadata
- **Pattern**: Shows how addons can serve specialized content niches

## VNYL Integration Strategy

### Clean Architecture Implementation

Our implementation follows strict Clean Architecture principles:

```
┌─────────────────────────────────────────┐
│  Presentation (UI Components & Hooks)  │ ← Stremio content in existing UI
├─────────────────────────────────────────┤
│  Application (Use Cases)               │ ← Stream discovery, addon management
├─────────────────────────────────────────┤
│  Domain (Entities & Repositories)      │ ← Addon, Stream, Catalog entities
├─────────────────────────────────────────┤
│  Infrastructure (HTTP & Storage)       │ ← Multi-addon HTTP client
└─────────────────────────────────────────┘
```

### Key Design Decisions

1. **Multi-Addon Aggregation**: Support multiple addons simultaneously, not just
   one
2. **Unified Interface**: Stremio streams appear alongside TMDB/Trakt data
3. **Fault Tolerance**: Circuit breakers and graceful failure handling
4. **User Control**: Users can install, configure, and manage their own addons
5. **Performance**: Aggressive caching and parallel processing

### Integration Points

- **Unified Search**: Stremio results merged with TMDB/Trakt search
- **Stream Discovery**: Primary use case - finding playable streams
- **Metadata Enhancement**: Additional metadata from specialized addons
- **Subtitle Support**: Multilingual subtitles from addon ecosystem

## Technical Implementation Highlights

### Core Interfaces

- `IStremioClient`: Main service interface for addon management and content
  discovery
- `IStremioAddon`: Domain entity representing installed addons with capabilities
- `IStremioStream`: Unified stream representation handling multiple formats
- `IStremioMeta`: Metadata entity compatible with existing media entities

### Repository Pattern

- `IStremioAddonRepository`: Addon installation and management
- `IStremioContentRepository`: Content fetching from multiple addons
- `IStremioManifestRepository`: Manifest caching and validation

### Use Cases

- `SearchStremioContentUseCase`: Multi-addon search with aggregation
- `GetStremioStreamsUseCase`: Stream resolution with quality ranking
- `ManageStremioAddonsUseCase`: Addon lifecycle management

### Error Handling

- Circuit breaker pattern for unreliable addons
- Graceful degradation when addons fail
- User-friendly error messages and retry mechanisms

## Security & Performance Considerations

### Security

- Manifest validation to prevent malicious addons
- HTTPS enforcement for all addon communication
- Content filtering based on user preferences
- Geo-restriction handling

### Performance

- Parallel queries across multiple addons
- Intelligent caching with appropriate TTLs
- Request timeouts and rate limiting
- Lazy loading of non-critical resources

### User Experience

- Seamless integration with existing VNYL interface
- Stream quality indicators and selection
- Addon management interface for power users
- Graceful handling of addon failures

## Implementation Phases

1. **Phase 1**: Core infrastructure (addon management, HTTP client)
2. **Phase 2**: Content discovery (catalogs, search)
3. **Phase 3**: Stream resolution (the primary value proposition)
4. **Phase 4**: Unified API integration (seamless user experience)
5. **Phase 5**: Advanced features (subtitle support, addon UI)

## Key Benefits for VNYL

1. **Stream Discovery**: Primary value - finding playable content streams
2. **Content Diversity**: Access to niche and specialized content
3. **User Control**: Users can customize their content sources
4. **Decentralization**: Not dependent on any single content provider
5. **Extensibility**: New content sources can be added via community addons

## Challenges & Mitigations

### Challenges

- Addon reliability and availability
- Varying content quality across addons
- Complex error handling across multiple services
- User confusion from too many options

### Mitigations

- Circuit breaker patterns for resilience
- Quality scoring and ranking algorithms
- Graceful fallbacks and error messages
- Curated addon recommendations and defaults

---

This summary provides the foundation for implementing Stremio support in VNYL
while maintaining the app's focus on clean architecture, performance, and user
experience.
