import { AuthMessage } from './auth-message';
import { CompanyMessage } from './company.message';
import { EmailMessage } from './email-message';
import { EmployeeMessage } from './employee-message';
import { HttpStatusMessage } from './http-status-message';
import { RBACMessage } from './rbac-message';
import { UserMessage } from './user-message';

export const Message = {
  SUCCESS: 'message.success',
  ERROR: 'message.error',
  ...HttpStatusMessage,
  ...AuthMessage,
  ...UserMessage,
  ...CompanyMessage,
  ...EmailMessage,
  ...RBACMessage,
  ...EmployeeMessage,
} as const;
