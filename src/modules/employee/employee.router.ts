import { Router } from 'express';
import { employeeRouter as employeeBasicRouter } from './routers/employee.router';

const employeeRouter = Router();

employeeRouter.use('', employeeBasicRouter);

export { employeeRouter };
