import Router from 'express';
import {createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController} from '../controller/user.controllers'
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../dtos/user.dto';


const router = Router()

router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.post('/create-user', validate(createUserSchema), createUserController)
router.patch('/update-user/:id', validate(updateUserSchema), updateUserController)
router.delete('/delete-user/:id', deleteUserController)


export default router