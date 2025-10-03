// React hook for accessing services from DI container
import { container } from './Container'

export function useService<T>(token: symbol): T {
  return container.resolve<T>(token)
}