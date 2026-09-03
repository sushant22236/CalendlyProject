import Router from 'express';
import {createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController} from '../controller/user.controllers'
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../dtos/user.dto';


const router = Router()

router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.post('/users', validate(createUserSchema), createUserController)
router.patch('/users/:id', validate(updateUserSchema), updateUserController)
router.delete('/users/:id', deleteUserController)


export default router