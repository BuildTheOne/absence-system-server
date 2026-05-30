import { HttpStatus } from '@/constants/http-status';
import { Message } from '@/constants/messages';
import { buildQueryFilter } from '@/lib/db';
import { catchAsyncController } from '@/lib/error';
import { BaseResponse } from '@/lib/response';
import { CreateEmployeeAbsenceDto } from '../dto/employee-absence.dto';
import { EmployeeAbsenceService } from '../services/employee-absence.service';

const findAllEmployeeAbsenceController = catchAsyncController(
  async (req, res) => {
    const filter = await buildQueryFilter(req);
    const data = await EmployeeAbsenceService.findAll(filter);
    res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
  }
);

const findEmployeeAbsenceByIdController = catchAsyncController(
  async (req, res) => {
    const filter = await buildQueryFilter(req);
    const { id } = req.params;
    const data = await EmployeeAbsenceService.findById(id as string, filter);
    res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
  }
);

const createEmployeeAbsenceController = catchAsyncController(
  async (req, res) => {
    const filter = await buildQueryFilter(req);
    const body = req.body as CreateEmployeeAbsenceDto;
    const data = await EmployeeAbsenceService.create(body, filter);
    res.json(BaseResponse(HttpStatus.OK, Message.SUCCESS, data));
  }
);

export const EmployeeAbsenceController = {
  findAll: findAllEmployeeAbsenceController,
  findById: findEmployeeAbsenceByIdController,
  create: createEmployeeAbsenceController,
};
