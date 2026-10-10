import { getDb } from '../connection';
import { Session } from '../../../types/database';
import { generateId, generateToken } from '../../utils/ids';
import crypto from 'crypto';

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export const sessionRepository = {
  createSession(userId: string, durationHours: number = 24): { session: Session; token: string } {
    const db = getDb();
    const id = generateId();
    const token = generateToken();
    const tokenHash = hashToken(token);
    
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO sessions (id, user_id, token_hash, expires_at)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `);
    
    const session = stmt.get(id, userId, tokenHash, expiresAt) as Session;
    
    return { session, token };
  },

  findByToken(token: string): Session | undefined {
    const db = getDb();
    const tokenHash = hashToken(token);
    return db.prepare(`SELECT * FROM sessions WHERE token_hash = ? AND revoked_at IS NULL AND expires_at > datetime('now', 'utc')`).get(tokenHash) as Session | undefined;
  },

  revokeSession(id: string): void {
    const db = getDb();
    db.prepare(`UPDATE sessions SET revoked_at = datetime('now', 'utc') WHERE id = ?`).run(id);
  },

  revokeAllForUser(userId: string): void {
    const db = getDb();
    db.prepare(`UPDATE sessions SET revoked_at = datetime('now', 'utc') WHERE user_id = ? AND revoked_at IS NULL`).run(userId);
  }
};
