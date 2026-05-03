import { filterQueryResult } from '@/lib/db';
import { NotFoundError } from '@/lib/error';
import {
  CreateRoleDto,
  RoleRepository,
  roleSchema,
  UpdateRoleDto,
} from '@/lib/rbac';
import { formatString } from '@/lib/utils';

async function findAllRoleService() {
  const data = await RoleRepository.findAll();
  const formattedData = filterQueryResult(roleSchema, data);
  return formattedData;
}

async function findRoleByIdService(id: string) {
  const data = await RoleRepository.findById(id);

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterQueryResult(roleSchema, data);
  return formattedData;
}

async function createRoleService(inputData: CreateRoleDto, companyId: string) {
  const data = await RoleRepository.create({
    ...inputData,
    code: formatString(inputData.name, 'SLUG'),
    companyId,
  });

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterQueryResult(roleSchema, data);
  return formattedData;
}

async function updateRoleService(
  roleId: string,
  inputData: UpdateRoleDto,
  companyId: string
) {
  const data = await RoleRepository.update(roleId, {
    ...inputData,
    code: formatString(inputData.name, 'SLUG'),
    companyId,
  });

  if (!data) {
    throw new NotFoundError();
  }

  const formattedData = filterQueryResult(roleSchema, data);
  return formattedData;
}

async function deleteRoleService(roleId: string) {
  const data = await RoleRepository.delete(roleId);

  if (!data) {
    throw new NotFoundError();
  }

  return data;
}

export const RoleService = {
  findAll: findAllRoleService,
  findById: findRoleByIdService,
  create: createRoleService,
  update: updateRoleService,
  delete: deleteRoleService,
};
