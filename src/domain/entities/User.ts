import { randomUUID } from 'expo-crypto'

export type UserAuthState = 'anonymous' | 'authenticated'

export interface TraktAccount {
  readonly username: string
  readonly userId: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresAt: number
}

export interface UserAccount {
  readonly trakt?: TraktAccount
}

export interface User {
  readonly id: string
  readonly authState: UserAuthState
  readonly account: UserAccount | null
  readonly createdAt: number
  readonly lastActiveAt: number
}

export interface UserHelpers {
  readonly isAuthenticated: boolean
  readonly hasTraktAuth: boolean
}

export type UserWithHelpers = User & UserHelpers

export const createAnonymousUser = (): User => ({
  id: randomUUID(),
  authState: 'anonymous',
  account: null,
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
})

export const createAuthenticatedUser = (account: UserAccount): User => ({
  id: randomUUID(),
  authState: 'authenticated',
  account,
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
})

export const upgradeToAuthenticatedUser = (user: User, account: UserAccount): User => ({
  ...user,
  authState: 'authenticated',
  account,
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
  get hasTraktAuth(): boolean {
    return this.account?.trakt !== undefined
  },
})
