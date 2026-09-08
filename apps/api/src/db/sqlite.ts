/**
 * Local durable store using Node 22 built-in node:sqlite.
 * Used when DATABASE_URL is not set.
 */
import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';
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
import {
  type DataStore,
  defaultPreferences,
  emptyProfile,
} from './types.js';

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
    createdAt: String(r.created_at),
  };
}

export function createSqliteStore(filePath = './data/biocross.db'): DataStore {
  const abs = path.resolve(filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const db = new DatabaseSync(abs);

  const ready = async () => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        date_of_birth TEXT,
        biological_sex TEXT,
        country TEXT,
        onboarding_completed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        readiness TEXT NOT NULL,
        readiness_note TEXT NOT NULL,
        last_updated_at TEXT NOT NULL,
        items TEXT NOT NULL DEFAULT '[]'
      );
      CREATE TABLE IF NOT EXISTS checks (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        payload TEXT NOT NULL,
        checked_at TEXT NOT NULL,
        risk_level TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        payload TEXT NOT NULL,
        is_read INTEGER NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS preferences (
        user_id TEXT PRIMARY KEY,
        payload TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        payload TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS extracted_items (
        id TEXT PRIMARY KEY,
        document_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        payload TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS password_resets (
        token TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at TEXT NOT NULL
      );
    `);

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get('demo@biocross.app');
    if (!existing) {
      const id = 'user-demo-001';
      db.prepare(
        `INSERT INTO users (id, email, full_name, password_hash, onboarding_completed, created_at, biological_sex, country, date_of_birth)
         VALUES (?, ?, ?, ?, 1, ?, 'female', 'United States', '1997-03-14')`,
      ).run(id, 'demo@biocross.app', 'Olivia Harper', hashPassword('demo1234'), new Date().toISOString());
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
      db.prepare(
        `INSERT INTO profiles (id, user_id, readiness, readiness_note, last_updated_at, items) VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(profile.id, id, profile.readiness, profile.readinessNote, profile.lastUpdatedAt, JSON.stringify(profile.items));
      db.prepare(`INSERT INTO preferences (user_id, payload) VALUES (?, ?)`).run(
        id,
        JSON.stringify(defaultPreferences()),
      );
    }
  };

  return {
    kind: 'sqlite',
    ready,
    async close() {
      db.close();
    },

    async findUserByEmail(email) {
      const row = db.prepare('SELECT * FROM users WHERE lower(email) = lower(?)').get(email) as
        | Record<string, unknown>
        | undefined;
      return row ? rowUser(row) : null;
    },

    async getUser(id) {
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as Record<string, unknown> | undefined;
      return row ? rowUser(row) : null;
    },

    async createUser(user) {
      db.prepare(
        `INSERT INTO users (id, email, full_name, password_hash, onboarding_completed, created_at, date_of_birth, biological_sex, country)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        user.id,
        user.email,
        user.fullName,
        user.passwordHash,
        user.onboardingCompleted ? 1 : 0,
        user.createdAt,
        user.dateOfBirth ?? null,
        user.biologicalSex ?? null,
        user.country ?? null,
      );
      const profile = emptyProfile(user.id);
      db.prepare(
        `INSERT INTO profiles (id, user_id, readiness, readiness_note, last_updated_at, items) VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(profile.id, user.id, profile.readiness, profile.readinessNote, profile.lastUpdatedAt, '[]');
      db.prepare(`INSERT INTO preferences (user_id, payload) VALUES (?, ?)`).run(
        user.id,
        JSON.stringify(defaultPreferences()),
      );
      return user;
    },

    async updateUser(user) {
      db.prepare(
        `UPDATE users SET email=?, full_name=?, password_hash=?, onboarding_completed=?, date_of_birth=?, biological_sex=?, country=? WHERE id=?`,
      ).run(
        user.email,
        user.fullName,
        user.passwordHash,
        user.onboardingCompleted ? 1 : 0,
        user.dateOfBirth ?? null,
        user.biologicalSex ?? null,
        user.country ?? null,
        user.id,
      );
      return user;
    },

    async deleteUser(id) {
      db.prepare('DELETE FROM password_resets WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM extracted_items WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM documents WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM preferences WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM alerts WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM checks WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM profiles WHERE user_id = ?').run(id);
      db.prepare('DELETE FROM users WHERE id = ?').run(id);
    },

    async getProfile(userId) {
      const row = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId) as
        | Record<string, unknown>
        | undefined;
      if (!row) return emptyProfile(userId);
      return {
        id: String(row.id),
        userId: String(row.user_id),
        readiness: row.readiness as HealthProfile['readiness'],
        readinessNote: String(row.readiness_note),
        lastUpdatedAt: String(row.last_updated_at),
        items: JSON.parse(String(row.items)),
      };
    },

    async saveProfile(profile) {
      db.prepare(
        `INSERT INTO profiles (id, user_id, readiness, readiness_note, last_updated_at, items)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(user_id) DO UPDATE SET
           readiness=excluded.readiness,
           readiness_note=excluded.readiness_note,
           last_updated_at=excluded.last_updated_at,
           items=excluded.items`,
      ).run(
        profile.id,
        profile.userId,
        profile.readiness,
        profile.readinessNote,
        profile.lastUpdatedAt,
        JSON.stringify(profile.items),
      );
      return profile;
    },

    async getChecks(userId) {
      const rows = db
        .prepare('SELECT payload FROM checks WHERE user_id = ? ORDER BY checked_at DESC')
        .all(userId) as Array<{ payload: string }>;
      return rows.map((r) => JSON.parse(r.payload) as SupplementCheck);
    },

    async getCheck(userId, id) {
      const row = db.prepare('SELECT payload FROM checks WHERE user_id = ? AND id = ?').get(userId, id) as
        | { payload: string }
        | undefined;
      return row ? (JSON.parse(row.payload) as SupplementCheck) : null;
    },

    async saveCheck(check) {
      db.prepare('DELETE FROM checks WHERE id = ?').run(check.id);
      db.prepare(
        `INSERT INTO checks (id, user_id, payload, checked_at, risk_level) VALUES (?, ?, ?, ?, ?)`,
      ).run(check.id, check.userId, JSON.stringify(check), check.checkedAt, check.riskLevel);
      return check;
    },

    async getAlerts(userId) {
      const rows = db.prepare('SELECT payload FROM alerts WHERE user_id = ?').all(userId) as Array<{
        payload: string;
      }>;
      return rows.map((r) => JSON.parse(r.payload) as SafetyAlert);
    },

    async saveAlerts(userId, alerts) {
      db.prepare('DELETE FROM alerts WHERE user_id = ?').run(userId);
      const stmt = db.prepare(
        `INSERT INTO alerts (id, user_id, payload, is_read) VALUES (?, ?, ?, ?)`,
      );
      for (const a of alerts) {
        stmt.run(a.id, userId, JSON.stringify(a), a.isRead ? 1 : 0);
      }
    },

    async markAlertRead(userId, id) {
      const row = db.prepare('SELECT payload FROM alerts WHERE user_id = ? AND id = ?').get(userId, id) as
        | { payload: string }
        | undefined;
      if (!row) return null;
      const alert = { ...(JSON.parse(row.payload) as SafetyAlert), isRead: true };
      db.prepare('UPDATE alerts SET payload = ?, is_read = 1 WHERE id = ?').run(JSON.stringify(alert), id);
      return alert;
    },

    async getPreferences(userId) {
      const row = db.prepare('SELECT payload FROM preferences WHERE user_id = ?').get(userId) as
        | { payload: string }
        | undefined;
      return row ? (JSON.parse(row.payload) as AppPreferences) : defaultPreferences();
    },

    async savePreferences(userId, prefs) {
      db.prepare(
        `INSERT INTO preferences (user_id, payload) VALUES (?, ?)
         ON CONFLICT(user_id) DO UPDATE SET payload=excluded.payload`,
      ).run(userId, JSON.stringify(prefs));
      return prefs;
    },

    async getDocuments(userId) {
      const rows = db.prepare('SELECT payload FROM documents WHERE user_id = ?').all(userId) as Array<{
        payload: string;
      }>;
      return rows.map((r) => JSON.parse(r.payload) as UploadedDocument);
    },

    async saveDocument(userId, doc) {
      db.prepare(`INSERT INTO documents (id, user_id, payload) VALUES (?, ?, ?)`).run(
        doc.id,
        userId,
        JSON.stringify(doc),
      );
      return doc;
    },

    async getExtracted(userId, documentId) {
      const rows = db
        .prepare('SELECT payload FROM extracted_items WHERE user_id = ? AND document_id = ?')
        .all(userId, documentId) as Array<{ payload: string }>;
      return rows.map((r) => JSON.parse(r.payload) as ExtractedHealthItem);
    },

    async saveExtracted(userId, items) {
      for (const item of items) {
        db.prepare(
          `INSERT INTO extracted_items (id, document_id, user_id, payload) VALUES (?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET payload=excluded.payload`,
        ).run(item.id, item.documentId, userId, JSON.stringify(item));
      }
    },

    async savePasswordReset(token, userId, expiresAt) {
      db.prepare(`INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)`).run(
        token,
        userId,
        expiresAt,
      );
    },

    async consumePasswordReset(token) {
      const row = db.prepare('SELECT * FROM password_resets WHERE token = ?').get(token) as
        | { user_id: string; expires_at: string }
        | undefined;
      if (!row) return null;
      db.prepare('DELETE FROM password_resets WHERE token = ?').run(token);
      if (new Date(row.expires_at).getTime() < Date.now()) return null;
      return row.user_id;
    },
  };
}
