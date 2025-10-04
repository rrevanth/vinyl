// Symbol tokens for all services
export const TOKENS = {
  // Core services
  StorageService: Symbol('StorageService'),
  LoggingService: Symbol('LoggingService'),
  ThemeService: Symbol('ThemeService'),
  I18nService: Symbol('I18nService'),
  UserService: Symbol('UserService'),

  // HTTP
  HttpClient: Symbol('HttpClient'),

  // Add more as needed
} as const
