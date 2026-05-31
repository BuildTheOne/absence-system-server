import { QueryParam } from '@/lib/db';
import { NotFoundError } from '@/lib/error';
import { filterResult } from '@/lib/validation';
import {
  CreateEmployeeAbsenceDto,
  employeeAbsenceSchema,
} from '../dto/employee-absence.dto';
import { EmployeeAbsenceRepository } from '../repositories/employee-absence.repository';

async function findAllEmployeeAbsenceService(filter: QueryParam) {
  const data = await EmployeeAbsenceRepository.findAll(filter);
  const formattedData = filterResult(employeeAbsenceSchema, data);
  return formattedData;
}

async function findEmployeeAbsenceByEmployeeIdService(
  employeeId: string,
  filter: QueryParam
) {
  const data = await EmployeeAbsenceRepository.findByEmployeeId(
    employeeId,
    filter
  );
  const formattedData = filterResult(employeeAbsenceSchema, data);
  return formattedData;
}

async function findEmployeeAbsenceByIdService(id: string, filter: QueryParam) {
  const data = await EmployeeAbsenceRepository.findById(id, filter);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterResult(employeeAbsenceSchema, data);
  return formattedData;
}

async function createEmployeeAbsenceService(
  inputData: CreateEmployeeAbsenceDto,
  filter: QueryParam
) {
  const data = await EmployeeAbsenceRepository.create(inputData, filter);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterResult(employeeAbsenceSchema, data);
  return formattedData;
}

export const EmployeeAbsenceService = {
  findAll: findAllEmployeeAbsenceService,
  findById: findEmployeeAbsenceByIdService,
  findByEmployeeId: findEmployeeAbsenceByEmployeeIdService,
  create: createEmployeeAbsenceService,
};
