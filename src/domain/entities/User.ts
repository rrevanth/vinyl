import { randomUUID } from 'expo-crypto'

export type UserAuthState = 'anonymous' | 'authenticated'

export interface User {
  readonly id: string
  readonly isPrimary: boolean
  readonly authState: UserAuthState
  readonly createdAt: number
  readonly lastActiveAt: number
}

export interface UserHelpers {
  readonly isAuthenticated: boolean
}

export type UserWithHelpers = User & UserHelpers

export const createPrimaryAnonymousUser = (): User => ({
  id: randomUUID(),
  isPrimary: true,
  authState: 'anonymous',
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
})

export const createSecondaryAnonymousUser = (): User => ({
  id: randomUUID(),
  isPrimary: false,
  authState: 'anonymous',
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
})

export const upgradeToAuthenticatedUser = (user: User): User => ({
  ...user,
  authState: 'authenticated',
  lastActiveAt: Date.now(),
})

export const updateLastActive = (user: User): User => ({
  ...user,
  lastActiveAt: Date.now(),
})

export const addUserHelpers = (user: User): UserWithHelpers => ({
  ...user,
  get isAuthenticated(): boolean {
    return this.authState === 'authenticated'
  },
})
