import { HttpStatus } from '@/constants/http-status';

type HttpStatusKey = keyof typeof HttpStatus;

export const HttpStatusMessage = Object.fromEntries(
  (Object.keys(HttpStatus) as HttpStatusKey[]).map((k) => [
    k,
    `message.http_status.${k.toLowerCase()}`,
  ])
) as {
  [K in HttpStatusKey]: string;
};
