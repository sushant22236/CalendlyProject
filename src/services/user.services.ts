import {getAll, getById} from '../repositories/user.respositories'
import { notFound } from '../utils/api.error'


export async function getAllUsers() {   
    const users = await getAll()
    return users
}

export async function getUserById(id: number) {
    const user = await getById(id)
    if(!user) {
        throw notFound('User not found ')
    }
    return user;
}