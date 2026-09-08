import pg from 'pg';

const { Pool } = pg;

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

export const pool = hasDatabaseUrl
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    })
  : null;

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured');
  }
  return pool.query<T>(text, params);
}
