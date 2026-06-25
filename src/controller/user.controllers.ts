import {Request, Response} from 'express'
import {getAllUsers, getUserById} from '../services/user.services'

export async function getAllUsersController(req: Request, res: Response) {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        console.error('Error fetching all users:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export async function getUserByIdController(req: Request, res: Response) {
    const {id} = req.params
    const response = await getUserById(Number(id))
    res.json(response)
}