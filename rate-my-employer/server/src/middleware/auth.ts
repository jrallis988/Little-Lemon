import type { Request, Response, NextFunction } from 'express';

import { verifyAccessToken } from '../auth/tokens.js';
import { findUserById } from '../users/repo.js';

export type AuthedRequest = Request & {
  userId?: string;
  userEmail?: string;
};

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
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
  try {
    const user = await findUserById(payload.sub);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }
    req.userId = user.id;
    req.userEmail = user.email;
    next();
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: 'Auth database unavailable' });
  }
}
