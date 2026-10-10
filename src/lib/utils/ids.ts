import crypto from 'crypto';

/**
 * Generates a collision-resistant UUID (v4)
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Generates a cryptographically secure random token
 */
export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}
