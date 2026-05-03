import { HttpStatusMessage } from './http-status-message';

export const Message = {
  SUCCESS: 'message.success',
  ERROR: 'message.error',
  ...HttpStatusMessage,
} as const;
