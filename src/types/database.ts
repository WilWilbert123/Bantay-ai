export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'ACTIVE' | 'LOCKED' | 'SUSPENDED';

export interface User {
  id: string;
  username: string;
  password_hash: string;
  display_name: string;
  role: Role;
  status: UserStatus;
  failed_login_count: number;
  locked_until: string | null;
  password_changed_at: string;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface Session {
  id: string;
  user_id: string;
  token_hash: string;
  created_at: string;
  expires_at: string;
  last_activity_at: string;
  revoked_at: string | null;
}
