import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { getUser } from '@/lib/auth';
import { catchAsync } from '@/lib/error';
import { CreateRoleDto, UpdateRoleDto } from '@/lib/rbac';
import { BaseResponse } from '@/lib/response';
import { RoleService } from '@/modules/role/role.service';

const findAllRoleController = catchAsync(async (req, res) => {
  const data = await RoleService.findAll();
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const findRoleByIdController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await RoleService.findById(id);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const createRoleController = catchAsync(async (req, res) => {
  const body = req.body as CreateRoleDto;
  const { companyId } = await getUser(req);
  const data = await RoleService.create(body, companyId);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const updateRoleController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body as UpdateRoleDto;
  const { companyId } = await getUser(req);
  const data = await RoleService.update(id, body, companyId);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const deleteRoleController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await RoleService.delete(id);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS));
});

export const RoleController = {
  findAll: findAllRoleController,
  findById: findRoleByIdController,
  create: createRoleController,
  update: updateRoleController,
  delete: deleteRoleController,
};
