import { randomUUID } from 'expo-crypto'

export type UserAuthState = 'anonymous' | 'authenticated'

export interface User {
  readonly id: string
  readonly name?: string
  readonly authState: UserAuthState
  readonly createdAt: number
  readonly lastActiveAt: number
}

export interface UserHelpers {
  readonly isAuthenticated: boolean
}

export type UserWithHelpers = User & UserHelpers

export const createAnonymousUser = (): User => ({
  id: randomUUID(),
  name: 'Anonymous',
  authState: 'anonymous',
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
})

export const createAuthenticatedUser = (name?: string): User => ({
  id: randomUUID(),
  name,
  authState: 'authenticated',
  createdAt: Date.now(),
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
