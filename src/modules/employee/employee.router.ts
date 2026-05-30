import { Route } from '@/constants/routes';
import { Router } from 'express';
import { employeeAbsenceRouter } from './routers/employee-absence.router';
import { employeeRouter as employeeBasicRouter } from './routers/employee.router';

const employeeRouter = Router();

employeeRouter.use(Route.employee.absence, employeeAbsenceRouter);
employeeRouter.use('', employeeBasicRouter);

export { employeeRouter };
