export type ConversationStatus = 'ACTIVE' | 'ARCHIVED';
export type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM';

export interface Conversation {
  id: string;
  title: string;
  status: ConversationStatus;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  created_at: string;
}

export interface Citation {
  id: string;
  message_id: string;
  chunk_id: string;
  relevance_score: number;
}
