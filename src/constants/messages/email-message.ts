const emailMessage = ['EMAIL_ERROR'] as const;

export const EmailMessage = Object.fromEntries(
  emailMessage.map((k) => [k, `message.email.${k.toLowerCase()}`])
) as {
  [K in (typeof emailMessage)[number]]: string;
};
