/**
 * Homescreen TanStack Query hooks
 *
 * This module exports all query and mutation hooks for the homescreen feature.
 * All hooks leverage TanStack Query for automatic caching, background refetching,
 * and optimistic updates.
 */

// Query hooks
export { useCatalogsQuery } from './useCatalogsQuery'
export { useHomescreenDataQuery } from './useHomescreenDataQuery'
export { useInfiniteCatalogItemsQuery } from './useInfiniteCatalogItemsQuery'

// Mutation hooks
export { useToggleCatalogMutation, useUpdateHomescreenPreferencesMutation } from './mutations'