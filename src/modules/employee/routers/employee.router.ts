import { validateForm } from '@/lib/validation';
import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../dto/employee.dto';

const employeeRouter = Router();

employeeRouter.get('', EmployeeController.findAll);
employeeRouter.get('/:id', EmployeeController.findById);
employeeRouter.post(
  '',
  validateForm(createEmployeeSchema),
  EmployeeController.create
);
employeeRouter.post(
  '/:id',
  validateForm(updateEmployeeSchema),
  EmployeeController.update
);
employeeRouter.delete('/:id', EmployeeController.delete);

export { employeeRouter };
