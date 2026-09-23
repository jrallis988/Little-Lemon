import type { Request, Response, NextFunction } from 'express';

import { verifyAccessToken } from '../auth/tokens.js';
import { findMemoryUserById } from '../store.js';

export type AuthedRequest = Request & {
  userId?: string;
  userEmail?: string;
};

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing bearer token' });
    return;
  }
  const payload = verifyAccessToken(header.slice('Bearer '.length));
  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
  const user = findMemoryUserById(payload.sub);
  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return;
  }
  req.userId = user.id;
  req.userEmail = user.email;
  next();
}
