import {Request, Response} from 'express'
import {getAllUsers, getUserById, createUser} from '../services/user.services'
import { sendSuccess } from '../utils/api.response'

export async function getAllUsersController(req: Request, res: Response) {
    try {
        const response = await getAllUsers()
        sendSuccess(res, response)
    } catch (error) {
        console.error('Error fetching all users:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getUserByIdController(req: Request, res: Response) {
    const {id} = req.params
    const response = await getUserById(Number(id))
    sendSuccess(res, response)
}

export async function createUserController(req: Request, res: Response) {
    console.log('Create user request body:', req.body);
    const newUser = await createUser(req.body);
    sendSuccess(res, newUser, 201, 'User created successfully');
}