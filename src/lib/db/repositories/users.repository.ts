import { getDb } from '../connection';
import { User, Role } from '../../../types/database';
import { generateId } from '../../utils/ids';
import { hashPassword } from '../../auth/password';

export const userRepository = {
  async createUser(username: string, passwordPlain: string, displayName: string, role: Role = 'USER'): Promise<User> {
    const db = getDb();
    const passwordHash = await hashPassword(passwordPlain);
    const id = generateId();
    
    const stmt = db.prepare(`
      INSERT INTO users (id, username, password_hash, display_name, role, password_changed_at)
      VALUES (?, ?, ?, ?, ?, datetime('now', 'utc'))
      RETURNING *
    `);
    
    return stmt.get(id, username, passwordHash, displayName, role) as User;
  },

  findByUsername(username: string): User | undefined {
    const db = getDb();
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
  },

  findById(id: string): User | undefined {
    const db = getDb();
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
  },

  updateFailedLogin(id: string, lockUntil?: string): void {
    const db = getDb();
    if (lockUntil) {
      db.prepare(`
        UPDATE users 
        SET failed_login_count = failed_login_count + 1,
            locked_until = ?,
            status = 'LOCKED'
        WHERE id = ?
      `).run(lockUntil, id);
    } else {
      db.prepare(`
        UPDATE users 
        SET failed_login_count = failed_login_count + 1
        WHERE id = ?
      `).run(id);
    }
  },

  resetFailedLogin(id: string): void {
    const db = getDb();
    db.prepare(`
      UPDATE users 
      SET failed_login_count = 0,
          locked_until = NULL,
          status = 'ACTIVE',
          last_login_at = datetime('now', 'utc')
      WHERE id = ?
    `).run(id);
  }
};
