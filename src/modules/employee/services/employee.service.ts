import { QueryParam } from '@/lib/db';
import { NotFoundError } from '@/lib/error';
import { filterResult } from '@/lib/validation';
import {
  CreateEmployeeDto,
  employeeSchema,
  UpdateEmployeeDto,
} from '../dto/employee.dto';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeAbsenceService } from './employee-absence.service';

async function findAllEmployeeService(filter: QueryParam) {
  const { data, total } = await EmployeeRepository.findAll(filter);
  const formattedData = filterResult(employeeSchema, data);
  return { data: formattedData, total };
}

async function findEmployeeByIdService(id: string, filter: QueryParam) {
  const data = await EmployeeRepository.findById(id, filter);
  if (!data) {
    throw new NotFoundError();
  }
  const formattedData = filterResult(employeeSchema, data);

  const absenceData = await EmployeeAbsenceService.findByEmployeeId(
    data.id,
    filter
  );

  return {
    ...formattedData,
    absence: absenceData,
  };
}

async function createEmployeeService(
  inputData: CreateEmployeeDto,
  filter: QueryParam
) {
  const data = await EmployeeRepository.create(inputData, filter);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterResult(employeeSchema, data);
  return formattedData;
}

async function updateEmployeeService(
  employeeId: string,
  inputData: UpdateEmployeeDto,
  filter: QueryParam
) {
  const data = await EmployeeRepository.update(employeeId, inputData, filter);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterResult(employeeSchema, data);
  return formattedData;
}

async function deleteEmployeeService(employeeId: string, filter: QueryParam) {
  const data = await EmployeeRepository.delete(employeeId, filter);

  if (!data) {
    throw new NotFoundError();
  }

  return data;
}

export const EmployeeService = {
  findAll: findAllEmployeeService,
  findById: findEmployeeByIdService,
  create: createEmployeeService,
  update: updateEmployeeService,
  delete: deleteEmployeeService,
};
