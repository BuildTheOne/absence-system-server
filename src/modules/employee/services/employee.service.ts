import { filterQueryResult, QueryParamFilter } from '@/lib/db';
import { NotFoundError } from '@/lib/error';
import {
  CreateEmployeeDto,
  employeeSchema,
  UpdateEmployeeDto,
} from '../dto/employee.dto';
import { EmployeeRepository } from '../repositories/employee.repository';
import { EmployeeAbsenceService } from './employee-absence.service';

async function findAllEmployeeService(filter: QueryParamFilter) {
  const data = await EmployeeRepository.findAll(filter);
  const formattedData = filterQueryResult(employeeSchema, data);
  return formattedData;
}

async function findEmployeeByIdService(id: string, filter: QueryParamFilter) {
  const data = await EmployeeRepository.findById(id, filter);
  if (!data) {
    throw new NotFoundError();
  }
  const formattedData = filterQueryResult(employeeSchema, data);

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
  filter: QueryParamFilter
) {
  const data = await EmployeeRepository.create(inputData, filter);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterQueryResult(employeeSchema, data);
  return formattedData;
}

async function updateEmployeeService(
  employeeId: string,
  inputData: UpdateEmployeeDto,
  filter: QueryParamFilter
) {
  const data = await EmployeeRepository.update(employeeId, inputData, filter);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterQueryResult(employeeSchema, data);
  return formattedData;
}

async function deleteEmployeeService(
  employeeId: string,
  filter: QueryParamFilter
) {
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
