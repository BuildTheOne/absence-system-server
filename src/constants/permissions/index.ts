import { EmployeePermission } from './employee.permission';
import { RBACPermission } from './rbac.permission';

export const Permission = {
  rbac: RBACPermission,
  employee: EmployeePermission,
};
