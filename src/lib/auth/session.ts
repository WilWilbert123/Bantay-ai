import { getSessionCookie, deleteSessionCookie } from './cookies';
import { sessionRepository } from '../db/repositories/sessions.repository';
import { userRepository } from '../db/repositories/users.repository';
import { User, Session } from '../../types/database';

export async function getCurrentSession(): Promise<{ user: User | null; session: Session | null }> {
  const token = await getSessionCookie();
  
  if (!token) {
    return { user: null, session: null };
  }

  const session = sessionRepository.findByToken(token);
  
  if (!session) {
    return { user: null, session: null };
  }

  const user = userRepository.findById(session.user_id);
  
  if (!user || user.status !== 'ACTIVE') {
    return { user: null, session: null };
  }

  return { user, session };
}

export async function requireAuth(): Promise<{ user: User; session: Session }> {
  const { user, session } = await getCurrentSession();
  
  if (!user || !session) {
    throw new Error('UNAUTHORIZED');
  }
  
  return { user, session };
}

export async function logout(): Promise<void> {
  const token = await getSessionCookie();
  if (token) {
    const session = sessionRepository.findByToken(token);
    if (session) {
      sessionRepository.revokeSession(session.id);
    }
  }
  await deleteSessionCookie();
}
