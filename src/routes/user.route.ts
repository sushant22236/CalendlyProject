import Router from 'express';
import {getAllUsersController, getUserByIdController} from '../controller/user.controllers'

const router = Router()

router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)

export default router