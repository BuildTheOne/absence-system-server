import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { buildQueryFilter } from '@/lib/db';
import { catchAsyncController } from '@/lib/error';
import { BaseResponse } from '@/lib/response';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { EmployeeService } from '../services/employee.service';

const findAllEmployeeController = catchAsyncController(async (req, res) => {
  const filter = await buildQueryFilter(req);
  const data = await EmployeeService.findAll(filter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const findEmployeeByIdController = catchAsyncController(async (req, res) => {
  const filter = await buildQueryFilter(req);
  const { id } = req.params;
  const data = await EmployeeService.findById(id as string, filter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const createEmployeeController = catchAsyncController(async (req, res) => {
  const filter = await buildQueryFilter(req);
  const body = req.body as CreateEmployeeDto;
  const data = await EmployeeService.create(body, filter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const updateEmployeeController = catchAsyncController(async (req, res) => {
  const filter = await buildQueryFilter(req);
  const { id } = req.params;
  const body = req.body as UpdateEmployeeDto;
  const data = await EmployeeService.update(id as string, body, filter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
});

const deleteEmployeeController = catchAsyncController(async (req, res) => {
  const filter = await buildQueryFilter(req);
  const { id } = req.params;
  await EmployeeService.delete(id as string, filter);
  res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS));
});

export const EmployeeController = {
  findAll: findAllEmployeeController,
  findById: findEmployeeByIdController,
  create: createEmployeeController,
  update: updateEmployeeController,
  delete: deleteEmployeeController,
};
