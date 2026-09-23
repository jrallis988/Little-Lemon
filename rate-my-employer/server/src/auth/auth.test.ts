import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';

import { hashPassword, verifyPassword } from './password.js';
import { signAccessToken, verifyAccessToken } from './tokens.js';
import { createApp } from '../index.js';
import { store } from '../store.js';

test('password hash verifies', () => {
  const hash = hashPassword('secret123');
  assert.equal(verifyPassword('secret123', hash), true);
  assert.equal(verifyPassword('wrong', hash), false);
});

test('access token round-trip', () => {
  const token = signAccessToken({ id: 'u1', email: 'a@b.com' }, 60);
  const payload = verifyAccessToken(token);
  assert.ok(payload);
  assert.equal(payload?.sub, 'u1');
  assert.equal(payload?.email, 'a@b.com');
});

test('auth sign-up, sign-in, forgot, reset', async () => {
  store.users = [];
  store.passwordResets.clear();
  const app = createApp();
  const email = `user${Date.now()}@example.com`;

  const signup = await request(app).post('/api/auth/sign-up').send({
    email,
    password: 'password123',
    displayName: 'Test User',
    username: 'testuser',
  });
  assert.equal(signup.status, 201);
  assert.ok(signup.body.accessToken);
  assert.equal(signup.body.user.email, email);

  const me = await request(app)
    .get('/api/auth/me')
    .set('Authorization', `Bearer ${signup.body.accessToken}`);
  assert.equal(me.status, 200);
  assert.equal(me.body.displayName, 'Test User');

  const signin = await request(app).post('/api/auth/sign-in').send({
    email,
    password: 'password123',
  });
  assert.equal(signin.status, 200);

  const forgot = await request(app).post('/api/auth/forgot-password').send({ email });
  assert.equal(forgot.status, 200);
  assert.ok(forgot.body.resetToken);

  const reset = await request(app).post('/api/auth/reset-password').send({
    email,
    token: forgot.body.resetToken,
    password: 'newpass99',
  });
  assert.equal(reset.status, 200);

  const oldLogin = await request(app).post('/api/auth/sign-in').send({
    email,
    password: 'password123',
  });
  assert.equal(oldLogin.status, 401);

  const newLogin = await request(app).post('/api/auth/sign-in').send({
    email,
    password: 'newpass99',
  });
  assert.equal(newLogin.status, 200);
});
