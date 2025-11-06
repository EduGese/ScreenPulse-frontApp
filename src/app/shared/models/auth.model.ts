/**
 * User data for authentication requests
 * Includes sensitive data only needed for client operations
 */
export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
}

/**
 * User data returned from server
 * NEVER includes password or sensitive data
 * Used in all responses and throughout the app
 */
export interface AuthUser {
  _id: string;
  email: string;
  name: string;
}

/**
 * Response from login endpoint
 * Contains authentication token + safe user data
 */
export interface LoginResponse {
  token: string;
  user: AuthUser; 
}

/**
 * Response from register endpoint
 * Semantic alias for AuthUser (same structure, no token)
 * 
 * Used in: UserService.register() return type
 */
export type RegisterResponse = AuthUser
