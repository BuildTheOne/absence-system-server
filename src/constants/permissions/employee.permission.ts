import { PermissionActionList } from './utils';

const EmployeeModulePermission = Object.fromEntries(
  PermissionActionList.map((k) => [k, `employee.${k}`])
) as {
  [K in (typeof PermissionActionList)[number]]: string;
};

const EmployeeAbsencePermission = Object.fromEntries(
  PermissionActionList.map((k) => [k, `employee_absence.${k}`])
) as {
  [K in (typeof PermissionActionList)[number]]: string;
};

const EmployeeActivityPermission = Object.fromEntries(
  PermissionActionList.map((k) => [k, `employee_activity.${k}`])
) as {
  [K in (typeof PermissionActionList)[number]]: string;
};

export const EmployeePermission = {
  ...EmployeeModulePermission,
  absence: EmployeeAbsencePermission,
  activity: EmployeeActivityPermission,
};
