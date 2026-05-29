import { Module } from './Module';

const employee: Module = {
  name: 'Employee',
  url: '/employee',
  label: 'module.employee.title',
  desc: 'module.employee.description',
};

const employeeAbsence: Module = {
  name: 'Employee Absence',
  url: '/employee/absence',
  label: 'module.employee.absence.title',
  desc: 'module.employee.absence.description',
};

const employeeActivity: Module = {
  name: 'Employee Activity',
  url: '/employee/activity',
  label: 'module.employee.activity.title',
  desc: 'module.employee.activity.description',
};

export const EmployeeModule = {
  employee: employee,
  absence: employeeAbsence,
  activity: employeeActivity,
};