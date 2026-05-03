import { Module } from '@/constants/modules/Module';

const master: Module = {
  name: 'Master',
  url: '/master',
};

const employee: Module = {
  name: 'Employee',
  url: '/employee',
  label: 'module.master.employee.title',
  desc: 'module.master.employee.description',
};

export const MasterModule = {
  master: master,
  employee: employee,
};
