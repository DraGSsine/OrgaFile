import { CookieOptions } from 'express';

export const resHeaders: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  domain: 'orgafile.com',
  path: '/',
};
