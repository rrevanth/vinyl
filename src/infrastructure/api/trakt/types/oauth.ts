/**
 * Trakt OAuth 2.0 authentication types
 *
 * Supports both standard web OAuth and device authentication flows
 * as described in the Trakt API documentation.
 */

// OAuth Token Response
export interface TraktTokenResponse {
  access_token: string
  token_type: 'bearer'
  expires_in: number
  refresh_token: string
  scope: string
  created_at: number
}

// OAuth Error Response
export interface TraktOAuthError {
  error: string
  error_description: string
}

// Standard OAuth Flow
export interface TraktOAuthParams {
  response_type: 'code'
  client_id: string
  redirect_uri: string
  state?: string
  signup?: 'true'
  prompt?: 'login'
}

export interface TraktTokenRequest {
  code: string
  client_id: string
  client_secret: string
  redirect_uri: string
  grant_type: 'authorization_code'
}

export interface TraktRefreshTokenRequest {
  refresh_token: string
  client_id: string
  client_secret: string
  redirect_uri: string
  grant_type: 'refresh_token'
}

export interface TraktRevokeTokenRequest {
  token: string
  client_id: string
  client_secret: string
}

// Device Authentication Flow
export interface TraktDeviceCodeRequest {
  client_id: string
}

export interface TraktDeviceCodeResponse {
  device_code: string
  user_code: string
  verification_url: string
  expires_in: number
  interval: number
}

export interface TraktDeviceTokenRequest {
  code: string // device_code
  client_id: string
  client_secret: string
}

// OAuth URL Builder
export interface TraktOAuthUrlOptions {
  clientId: string
  redirectUri: string
  state?: string
  signup?: boolean
  prompt?: 'login'
  baseUrl?: string
}

// Token Status
export interface TraktTokenInfo {
  isValid: boolean
  expiresAt: Date
  expiresInSeconds: number
  needsRefresh: boolean
}
