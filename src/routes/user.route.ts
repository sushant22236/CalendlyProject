import Router from 'express';
import {createUserController, getAllUsersController, getUserByIdController} from '../controller/user.controllers'
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../dtos/user.dto';


const router = Router()

router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.post('/create-user', validate(createUserSchema), createUserController)

export default router