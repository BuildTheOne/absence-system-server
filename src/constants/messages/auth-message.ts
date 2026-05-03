const authMessage = [
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILED',
  'SIGN_OUT_SUCCESS',
  'SIGN_OUT_FAILED',
  'JWT_EXPIRED',
  'JWT_INVALID',
  'JWT_ERROR',
  'SESSION_NOT_FOUND',
  'SESSION_EXPIRED',
  'EMAIL_REQUIRED',
  'USERNAME_REQUIRED',
  'EMAIL_OR_USERNAME_REQUIRED',
  'PASSWORD_REQUIRED',
  'PASSWORD_INVALID',
  'NEW_PASSWORD_REQUIRED',
  'OLD_PASSWORD_REQUIRED',
  'PASSWORD_CANNOT_SAME',
  'PASSWORD_CHANGED',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILED',
  'USERNAME_EMAIL_EXISTED',
] as const;

export const AuthMessage = Object.fromEntries(
  authMessage.map((k) => [k, `message.auth.${k.toLowerCase()}`])
) as {
  [K in (typeof authMessage)[number]]: string;
};
