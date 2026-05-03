import { Env } from '@/env';
import pino from 'pino';

export const logger = pino(
  Env.NODE_ENV === 'production'
    ? {
        level: 'info',
      }
    : {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      }
);
