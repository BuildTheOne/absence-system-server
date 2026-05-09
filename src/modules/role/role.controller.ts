import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { getUser } from '@/lib/auth';
import { companyQueryFilter } from '@/lib/db';
import { catchAsyncController } from '@/lib/error';
import { CreateRoleDto, UpdateRoleDto } from '@/lib/rbac';
import { BaseResponse } from '@/lib/response';
import { RoleService } from '@/modules/role/role.service';

const findAllRoleController = catchAsyncController(async (req, res) => {
  const companyFilter = await companyQueryFilter(req);
  const data = await RoleService.findAll(companyFilter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const findRoleByIdController = catchAsyncController(async (req, res) => {
  const companyFilter = await companyQueryFilter(req);
  const { id } = req.params;
  const data = await RoleService.findById(id as string, companyFilter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const createRoleController = catchAsyncController(async (req, res) => {
  const body = req.body as CreateRoleDto;
  const { companyId } = await getUser(req);
  const data = await RoleService.create(body, companyId);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const updateRoleController = catchAsyncController(async (req, res) => {
  const { id } = req.params;
  const body = req.body as UpdateRoleDto;
  const { companyId } = await getUser(req);
  const data = await RoleService.update(id as string, body, companyId);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const deleteRoleController = catchAsyncController(async (req, res) => {
  const { id } = req.params;
  await RoleService.delete(id as string);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS));
});

export const RoleController = {
  findAll: findAllRoleController,
  findById: findRoleByIdController,
  create: createRoleController,
  update: updateRoleController,
  delete: deleteRoleController,
};
