const employeeMessage = [
  'EMPLOYEE_NOT_FOUND',
  'EMPLOYEE_ALREADY_EXIST',
  'USER_NOT_EMPLOYEE',
  'EMPLOYEE_NAME_IS_REQUIRED',
] as const;

export const EmployeeMessage = Object.fromEntries(
  employeeMessage.map((k) => [k, `message.employee.${k.toLowerCase()}`])
) as {
  [K in (typeof employeeMessage)[number]]: string;
};
