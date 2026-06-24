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
    try {
        const user = await getUserById(Number(id))
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}