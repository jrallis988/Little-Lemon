import { query, pool } from '../db.js';
import {
  addMemoryUser,
  findMemoryUserByEmail,
  findMemoryUserById,
  setPasswordReset as setMemoryPasswordReset,
  takePasswordReset as takeMemoryPasswordReset,
  updateMemoryUserPassword,
  type MemoryUser,
} from '../store.js';

export type AppUser = MemoryUser & {
  passwordHash: string | null;
  oauthProvider?: string | null;
  oauthSub?: string | null;
};

export function isPostgresMode() {
  return Boolean(process.env.DATABASE_URL && pool);
}

function mapPgUser(row: Record<string, unknown>): AppUser {
  return {
    id: String(row.id),
    email: String(row.email),
    passwordHash: (row.password_hash as string | null) ?? null,
    displayName: String(row.display_name),
    username: row.username ? String(row.username) : undefined,
    role: row.role as AppUser['role'],
    headline: (row.headline as string | null) ?? null,
    oauthProvider: (row.oauth_provider as string | null) ?? null,
    oauthSub: (row.oauth_sub as string | null) ?? null,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

export async function createUser(input: {
  email: string;
  passwordHash: string | null;
  displayName: string;
  username?: string;
  oauthProvider?: string | null;
  oauthSub?: string | null;
}): Promise<AppUser> {
  if (!isPostgresMode()) {
    const now = new Date().toISOString();
    return addMemoryUser({
      id: `user-${Date.now()}`,
      email: input.email,
      passwordHash: input.passwordHash ?? '',
      displayName: input.displayName,
      username: input.username,
      role: 'user',
      oauthProvider: input.oauthProvider ?? null,
      oauthSub: input.oauthSub ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  const result = await query(
    `
    INSERT INTO users (email, password_hash, display_name, username, oauth_provider, oauth_sub)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, password_hash, display_name, username, role, headline,
              oauth_provider, oauth_sub, created_at, updated_at
    `,
    [
      input.email,
      input.passwordHash,
      input.displayName,
      input.username ?? null,
      input.oauthProvider ?? null,
      input.oauthSub ?? null,
    ],
  );
  return mapPgUser(result.rows[0]);
}

export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const normalized = email.trim().toLowerCase();
  if (!isPostgresMode()) {
    return findMemoryUserByEmail(normalized) ?? null;
  }
  const result = await query(
    `
    SELECT id, email, password_hash, display_name, username, role, headline,
           oauth_provider, oauth_sub, created_at, updated_at
    FROM users WHERE email = $1 LIMIT 1
    `,
    [normalized],
  );
  return result.rows[0] ? mapPgUser(result.rows[0]) : null;
}

export async function findUserById(id: string): Promise<AppUser | null> {
  if (!isPostgresMode()) {
    return findMemoryUserById(id) ?? null;
  }
  const result = await query(
    `
    SELECT id, email, password_hash, display_name, username, role, headline,
           oauth_provider, oauth_sub, created_at, updated_at
    FROM users WHERE id::text = $1 LIMIT 1
    `,
    [id],
  );
  return result.rows[0] ? mapPgUser(result.rows[0]) : null;
}

export async function findUserByOAuth(
  provider: string,
  sub: string,
): Promise<AppUser | null> {
  if (!isPostgresMode()) {
    const { store } = await import('../store.js');
    return (
      store.users.find(
        (u) => u.oauthProvider === provider && u.oauthSub === sub,
      ) ?? null
    );
  }
  const result = await query(
    `
    SELECT id, email, password_hash, display_name, username, role, headline,
           oauth_provider, oauth_sub, created_at, updated_at
    FROM users WHERE oauth_provider = $1 AND oauth_sub = $2 LIMIT 1
    `,
    [provider, sub],
  );
  return result.rows[0] ? mapPgUser(result.rows[0]) : null;
}

export async function updateUserPassword(
  email: string,
  passwordHash: string,
): Promise<AppUser | null> {
  const normalized = email.trim().toLowerCase();
  if (!isPostgresMode()) {
    return updateMemoryUserPassword(normalized, passwordHash);
  }
  const result = await query(
    `
    UPDATE users
    SET password_hash = $2, updated_at = NOW()
    WHERE email = $1
    RETURNING id, email, password_hash, display_name, username, role, headline,
              oauth_provider, oauth_sub, created_at, updated_at
    `,
    [normalized, passwordHash],
  );
  return result.rows[0] ? mapPgUser(result.rows[0]) : null;
}

export async function savePasswordReset(
  email: string,
  token: string,
  expiresAt: Date,
): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!isPostgresMode()) {
    setMemoryPasswordReset(normalized, token, expiresAt.getTime());
    return;
  }
  await query(`DELETE FROM password_resets WHERE email = $1`, [normalized]);
  await query(
    `
    INSERT INTO password_resets (email, token, expires_at)
    VALUES ($1, $2, $3)
    `,
    [normalized, token, expiresAt.toISOString()],
  );
}

export async function consumePasswordReset(
  email: string,
  token: string,
): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!isPostgresMode()) {
    return Boolean(takeMemoryPasswordReset(normalized, token));
  }
  const result = await query(
    `
    DELETE FROM password_resets
    WHERE email = $1 AND token = $2 AND expires_at > NOW()
    RETURNING id
    `,
    [normalized, token],
  );
  return result.rowCount !== null && result.rowCount > 0;
}
