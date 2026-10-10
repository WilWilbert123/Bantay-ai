'use server';

import { z } from 'zod';
import { userRepository } from '../../lib/db/repositories/users.repository';
import { sessionRepository } from '../../lib/db/repositories/sessions.repository';
import { verifyPassword } from '../../lib/auth/password';
import { setSessionCookie, deleteSessionCookie } from '../../lib/auth/cookies';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

export async function login(formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { error: 'Invalid input' };
  }

  const { username, password } = result.data;

  // 1. Find user
  const user = userRepository.findByUsername(username);
  
  if (!user) {
    // Avoid user enumeration
    await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
    return { error: 'Invalid username or password' };
  }

  // 2. Check lockouts
  if (user.status === 'LOCKED' && user.locked_until) {
    const lockedUntil = new Date(user.locked_until + 'Z'); // Parse UTC
    if (lockedUntil > new Date()) {
      return { error: 'Account is temporarily locked due to too many failed attempts' };
    } else {
      // Lock expired
      userRepository.resetFailedLogin(user.id);
    }
  }

  // 3. Verify password
  const isValid = await verifyPassword(password, user.password_hash);
  
  if (!isValid) {
    // Increment failed logins
    const currentFails = user.failed_login_count + 1;
    let lockUntil: string | undefined;
    
    // Lock for 15 mins after 5 failed attempts
    if (currentFails >= 5) {
      const lockDate = new Date(Date.now() + 15 * 60 * 1000);
      lockUntil = lockDate.toISOString().replace('T', ' ').substring(0, 19);
    }
    
    userRepository.updateFailedLogin(user.id, lockUntil);
    return { error: 'Invalid username or password' };
  }

  // 4. Reset failed logins on success
  userRepository.resetFailedLogin(user.id);

  // 5. Create session
  const { session, token } = sessionRepository.createSession(user.id);

  // 6. Set cookie
  await setSessionCookie(token, new Date(session.expires_at + 'Z'));

  return { success: true };
}

export async function logoutAction() {
  await deleteSessionCookie();
  // We can't easily retrieve token here to revoke it in DB without `cookies()` which we use in `session.ts` logout().
  // We'll rely on the `session.ts` logout() being called by the client component or another action.
  return { success: true };
}
