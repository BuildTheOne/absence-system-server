import { Message } from '@/constants/messages';
import { UnauthorizedError } from '@/lib/error';

export class JwtError extends UnauthorizedError {
  constructor(message?: string) {
    super(message);
    if (!message) {
      this.message = Message.JWT_ERROR;
    }
  }
}

export class JwtInvalidError extends JwtError {
  constructor(message?: string) {
    super(message);
    this.message = Message.JWT_INVALID;
  }
}

export class JwtExpiredError extends JwtError {
  constructor(message?: string) {
    super(message);
    this.message = Message.JWT_EXPIRED;
  }
}
