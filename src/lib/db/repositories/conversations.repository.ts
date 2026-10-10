import { getDb } from '../connection';
import { Conversation, Message, MessageRole } from '../../../types/ai';
import { generateId } from '../../utils/ids';

export const conversationsRepository = {
  create(title: string = 'New Conversation'): Conversation {
    const db = getDb();
    const id = generateId();
    
    const stmt = db.prepare(`
      INSERT INTO conversations (id, title)
      VALUES (?, ?)
      RETURNING *
    `);
    
    return stmt.get(id, title) as Conversation;
  },

  getRecent(limit: number = 20): Conversation[] {
    const db = getDb();
    return db.prepare('SELECT * FROM conversations WHERE status = "ACTIVE" ORDER BY updated_at DESC LIMIT ?')
      .all(limit) as Conversation[];
  },

  addMessage(conversationId: string, role: MessageRole, content: string): Message {
    const db = getDb();
    const id = generateId();
    
    const execute = db.transaction(() => {
      // Update conversation timestamp
      db.prepare('UPDATE conversations SET updated_at = datetime("now", "utc") WHERE id = ?').run(conversationId);
      
      // Insert message
      const stmt = db.prepare(`
        INSERT INTO messages (id, conversation_id, role, content)
        VALUES (?, ?, ?, ?)
        RETURNING *
      `);
      return stmt.get(id, conversationId, role, content) as Message;
    });

    return execute();
  },

  getMessages(conversationId: string): Message[] {
    const db = getDb();
    return db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC')
      .all(conversationId) as Message[];
  }
};
