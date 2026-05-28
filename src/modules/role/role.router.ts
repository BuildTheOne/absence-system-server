import { createRoleSchema, updateRoleSchema } from '@/lib/rbac';
import { validateForm } from '@/lib/validation';
import { Router } from 'express';
import { RoleController } from './role.controller';

const roleRouter = Router();

roleRouter.get('', RoleController.findAll);
roleRouter.get('/:id', RoleController.findById);
roleRouter.post('', validateForm(createRoleSchema), RoleController.create);
roleRouter.post('/:id', validateForm(updateRoleSchema), RoleController.update);
roleRouter.delete('/:id', RoleController.delete);

export { roleRouter };
