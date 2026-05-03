const userMessage = [
  'USER_NOT_FOUND',
  'USER_UPDATED',
  'PROFILE_NOT_FOUND',
  'PROFILE_UPDATED',
  'NAME_REQUIRED',
] as const;

export const UserMessage = Object.fromEntries(
  userMessage.map((k) => [k, `message.user.${k.toLowerCase()}`])
) as {
  [K in (typeof userMessage)[number]]: string;
};
