'use server';

import { z } from 'zod';
import { getDb } from '../../lib/db/connection';
import { userRepository } from '../../lib/db/repositories/users.repository';
import { sessionRepository } from '../../lib/db/repositories/sessions.repository';
import { setSessionCookie } from '../../lib/auth/cookies';

const bootstrapSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters')
});

export async function bootstrapSystem(formData: FormData) {
  // First, verify that there are ZERO users in the database
  const db = getDb();
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  
  if (userCount.count > 0) {
    return { error: 'System is already bootstrapped. Please login.' };
  }

  const data = Object.fromEntries(formData);
  const result = bootstrapSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { username, password, displayName } = result.data;

  try {
    // Create the super admin user
    const user = await userRepository.createUser(username, password, displayName, 'SUPER_ADMIN');
    
    // Auto-login
    const { session, token } = sessionRepository.createSession(user.id);
    await setSessionCookie(token, new Date(session.expires_at + 'Z'));
    
    return { success: true };
  } catch (error: any) {
    // Check if it's a unique constraint error just in case of race condition
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { error: 'Username already taken' };
    }
    return { error: 'Failed to bootstrap system' };
  }
}

export async function isSystemBootstrapped(): Promise<boolean> {
  const db = getDb();
  try {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    return userCount.count > 0;
  } catch (e) {
    // If table doesn't exist yet, we treat as not bootstrapped but it shouldn't happen if db:init is run
    return false;
  }
}
