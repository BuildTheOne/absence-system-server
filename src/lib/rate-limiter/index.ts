import { Message } from '@/constants/messages';
import { TooManyRequestsError } from '@/lib/error';
import rateLimit from 'express-rate-limit';

export const rateLimiter = (windowTime: number = 900, limit: number = 100) => {
  return rateLimit({
    windowMs: windowTime * 1000,
    limit: limit,
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
      error: Message.TOO_MANY_REQUESTS,
      // retryAfter: `${windowTime}s`,
    },
    handler: () => {
      throw new TooManyRequestsError();
    },
  });
};
