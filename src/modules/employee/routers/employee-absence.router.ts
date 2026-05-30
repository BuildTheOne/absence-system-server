import { validateForm } from '@/lib/validation';
import { Router } from 'express';
import { EmployeeAbsenceController } from '../controllers/employee-absence.controller';
import { createEmployeeAbsenceSchema } from '../dto/employee-absence.dto';

const employeeAbsenceRouter = Router();

employeeAbsenceRouter.get('', EmployeeAbsenceController.findAll);
employeeAbsenceRouter.get('/:id', EmployeeAbsenceController.findById);
employeeAbsenceRouter.post(
  '',
  validateForm(createEmployeeAbsenceSchema),
  EmployeeAbsenceController.create
);

export { employeeAbsenceRouter };
