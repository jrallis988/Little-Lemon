/**
 * Postgres store — used when DATABASE_URL is set (Railway, Neon, Render, etc.).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { hashPassword } from '../auth.js';
import type {
  AppPreferences,
  ExtractedHealthItem,
  HealthProfile,
  SafetyAlert,
  SupplementCheck,
  UploadedDocument,
  UserRecord,
} from '../types.js';
import { type DataStore, defaultPreferences, emptyProfile } from './types.js';

const { Pool } = pg;

function rowUser(r: Record<string, unknown>): UserRecord {
  return {
    id: String(r.id),
    email: String(r.email),
    fullName: String(r.full_name),
    passwordHash: String(r.password_hash),
    dateOfBirth: r.date_of_birth ? String(r.date_of_birth) : undefined,
    biologicalSex: r.biological_sex as UserRecord['biologicalSex'],
    country: r.country ? String(r.country) : undefined,
    onboardingCompleted: Boolean(r.onboarding_completed),
    createdAt: new Date(String(r.created_at)).toISOString(),
  };
}

export function createPostgresStore(databaseUrl: string): DataStore {
  const pool = new Pool({ connectionString: databaseUrl, ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false } });

  return {
    kind: 'postgres',
    async ready() {
      const schemaPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'schema.sql');
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(sql);

      const existing = await pool.query('SELECT id FROM users WHERE email = $1', ['demo@biocross.app']);
      if (existing.rowCount === 0) {
        const id = 'user-demo-001';
        await pool.query(
          `INSERT INTO users (id, email, full_name, password_hash, onboarding_completed, created_at, biological_sex, country, date_of_birth)
           VALUES ($1,$2,$3,$4,true,NOW(),'female','United States','1997-03-14')`,
          [id, 'demo@biocross.app', 'Olivia Harper', hashPassword('demo1234')],
        );
        const profile = emptyProfile(id);
        profile.readiness = 'strong';
        profile.readinessNote = 'Demo profile seeded for beta testing.';
        profile.items = [
          {
            id: 'cond-1',
            category: 'condition',
            name: 'Congenital heart disease',
            details: 'D-Transposition of the Great Arteries',
            status: 'confirmed',
            confirmedAt: new Date().toISOString(),
          },
          {
            id: 'med-1',
            category: 'medication',
            name: 'Losartan',
            details: '50 mg daily',
            status: 'confirmed',
            confirmedAt: new Date().toISOString(),
          },
          {
            id: 'med-2',
            category: 'medication',
            name: 'Aspirin',
            details: '81 mg daily',
            status: 'confirmed',
            confirmedAt: new Date().toISOString(),
          },
        ];
        await pool.query(
          `INSERT INTO profiles (id, user_id, readiness, readiness_note, last_updated_at, items)
           VALUES ($1,$2,$3,$4,NOW(),$5::jsonb)`,
          [profile.id, id, profile.readiness, profile.readinessNote, JSON.stringify(profile.items)],
        );
        await pool.query(`INSERT INTO preferences (user_id, payload) VALUES ($1,$2::jsonb)`, [
          id,
          JSON.stringify(defaultPreferences()),
        ]);
      }
    },

    async close() {
      await pool.end();
    },

    async findUserByEmail(email) {
      const res = await pool.query('SELECT * FROM users WHERE lower(email) = lower($1)', [email]);
      return res.rows[0] ? rowUser(res.rows[0]) : null;
    },

    async getUser(id) {
      const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return res.rows[0] ? rowUser(res.rows[0]) : null;
    },

    async createUser(user) {
      await pool.query(
        `INSERT INTO users (id, email, full_name, password_hash, onboarding_completed, created_at, date_of_birth, biological_sex, country)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          user.id,
          user.email,
          user.fullName,
          user.passwordHash,
          user.onboardingCompleted,
          user.createdAt,
          user.dateOfBirth ?? null,
          user.biologicalSex ?? null,
          user.country ?? null,
        ],
      );
      const profile = emptyProfile(user.id);
      await pool.query(
        `INSERT INTO profiles (id, user_id, readiness, readiness_note, last_updated_at, items)
         VALUES ($1,$2,$3,$4,$5,$6::jsonb)`,
        [profile.id, user.id, profile.readiness, profile.readinessNote, profile.lastUpdatedAt, JSON.stringify([])],
      );
      await pool.query(`INSERT INTO preferences (user_id, payload) VALUES ($1,$2::jsonb)`, [
        user.id,
        JSON.stringify(defaultPreferences()),
      ]);
      return user;
    },

    async updateUser(user) {
      await pool.query(
        `UPDATE users SET email=$1, full_name=$2, password_hash=$3, onboarding_completed=$4,
         date_of_birth=$5, biological_sex=$6, country=$7 WHERE id=$8`,
        [
          user.email,
          user.fullName,
          user.passwordHash,
          user.onboardingCompleted,
          user.dateOfBirth ?? null,
          user.biologicalSex ?? null,
          user.country ?? null,
          user.id,
        ],
      );
      return user;
    },

    async deleteUser(id) {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
    },

    async getProfile(userId) {
      const res = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
      if (!res.rows[0]) return emptyProfile(userId);
      const r = res.rows[0];
      return {
        id: r.id,
        userId: r.user_id,
        readiness: r.readiness,
        readinessNote: r.readiness_note,
        lastUpdatedAt: new Date(r.last_updated_at).toISOString(),
        items: r.items,
      };
    },

    async saveProfile(profile) {
      await pool.query(
        `INSERT INTO profiles (id, user_id, readiness, readiness_note, last_updated_at, items)
         VALUES ($1,$2,$3,$4,$5,$6::jsonb)
         ON CONFLICT (user_id) DO UPDATE SET
           readiness=EXCLUDED.readiness,
           readiness_note=EXCLUDED.readiness_note,
           last_updated_at=EXCLUDED.last_updated_at,
           items=EXCLUDED.items`,
        [
          profile.id,
          profile.userId,
          profile.readiness,
          profile.readinessNote,
          profile.lastUpdatedAt,
          JSON.stringify(profile.items),
        ],
      );
      return profile;
    },

    async getChecks(userId) {
      const res = await pool.query(
        'SELECT payload FROM checks WHERE user_id = $1 ORDER BY checked_at DESC',
        [userId],
      );
      return res.rows.map((r) => r.payload as SupplementCheck);
    },

    async getCheck(userId, id) {
      const res = await pool.query('SELECT payload FROM checks WHERE user_id = $1 AND id = $2', [userId, id]);
      return res.rows[0] ? (res.rows[0].payload as SupplementCheck) : null;
    },

    async saveCheck(check) {
      await pool.query('DELETE FROM checks WHERE id = $1', [check.id]);
      await pool.query(
        `INSERT INTO checks (id, user_id, payload, checked_at, risk_level) VALUES ($1,$2,$3::jsonb,$4,$5)`,
        [check.id, check.userId, JSON.stringify(check), check.checkedAt, check.riskLevel],
      );
      return check;
    },

    async getAlerts(userId) {
      const res = await pool.query('SELECT payload FROM alerts WHERE user_id = $1', [userId]);
      return res.rows.map((r) => r.payload as SafetyAlert);
    },

    async saveAlerts(userId, alerts) {
      await pool.query('DELETE FROM alerts WHERE user_id = $1', [userId]);
      for (const a of alerts) {
        await pool.query(`INSERT INTO alerts (id, user_id, payload, is_read) VALUES ($1,$2,$3::jsonb,$4)`, [
          a.id,
          userId,
          JSON.stringify(a),
          a.isRead,
        ]);
      }
    },

    async markAlertRead(userId, id) {
      const res = await pool.query('SELECT payload FROM alerts WHERE user_id = $1 AND id = $2', [userId, id]);
      if (!res.rows[0]) return null;
      const alert = { ...(res.rows[0].payload as SafetyAlert), isRead: true };
      await pool.query('UPDATE alerts SET payload=$1::jsonb, is_read=true WHERE id=$2', [
        JSON.stringify(alert),
        id,
      ]);
      return alert;
    },

    async getPreferences(userId) {
      const res = await pool.query('SELECT payload FROM preferences WHERE user_id = $1', [userId]);
      return res.rows[0] ? (res.rows[0].payload as AppPreferences) : defaultPreferences();
    },

    async savePreferences(userId, prefs) {
      await pool.query(
        `INSERT INTO preferences (user_id, payload) VALUES ($1,$2::jsonb)
         ON CONFLICT (user_id) DO UPDATE SET payload=EXCLUDED.payload`,
        [userId, JSON.stringify(prefs)],
      );
      return prefs;
    },

    async getDocuments(userId) {
      const res = await pool.query('SELECT payload FROM documents WHERE user_id = $1', [userId]);
      return res.rows.map((r) => r.payload as UploadedDocument);
    },

    async saveDocument(userId, doc) {
      await pool.query(`INSERT INTO documents (id, user_id, payload) VALUES ($1,$2,$3::jsonb)`, [
        doc.id,
        userId,
        JSON.stringify(doc),
      ]);
      return doc;
    },

    async getExtracted(userId, documentId) {
      const res = await pool.query(
        'SELECT payload FROM extracted_items WHERE user_id = $1 AND document_id = $2',
        [userId, documentId],
      );
      return res.rows.map((r) => r.payload as ExtractedHealthItem);
    },

    async saveExtracted(userId, items) {
      for (const item of items) {
        await pool.query(
          `INSERT INTO extracted_items (id, document_id, user_id, payload) VALUES ($1,$2,$3,$4::jsonb)
           ON CONFLICT (id) DO UPDATE SET payload=EXCLUDED.payload`,
          [item.id, item.documentId, userId, JSON.stringify(item)],
        );
      }
    },

    async savePasswordReset(token, userId, expiresAt) {
      await pool.query(`INSERT INTO password_resets (token, user_id, expires_at) VALUES ($1,$2,$3)`, [
        token,
        userId,
        expiresAt,
      ]);
    },

    async consumePasswordReset(token) {
      const res = await pool.query('SELECT * FROM password_resets WHERE token = $1', [token]);
      if (!res.rows[0]) return null;
      await pool.query('DELETE FROM password_resets WHERE token = $1', [token]);
      if (new Date(res.rows[0].expires_at).getTime() < Date.now()) return null;
      return String(res.rows[0].user_id);
    },
  };
}
