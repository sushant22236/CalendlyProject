import {create, findByEmail, getAll, getById, update, remove} from '../repositories/user.respositories'
import { notFound } from '../utils/api.error'
import { CreateUserDto } from '../dtos/user.dto'
import { conflict } from '../utils/api.error'


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

export async function createUser(data: CreateUserDto) {
    
    const existingUser = await findByEmail(data.email)
    if(existingUser){
        throw conflict('User with this email already exists')
    }
    const user = await create(data)
    return user
}

export async function updateUser(id: number, data: Partial<CreateUserDto>) {
    const user = await getById(id)
    if (!user) {
        throw notFound('User not found')
    }

    if(data.email && data.email !== user.email) {
        const existingUser = await findByEmail(data.email)
        if(existingUser){
            throw conflict('User with this email already exists')
        }
    }

    const updatedUser = await update(id, data)
    return updatedUser
}

export async function deleteUser(id: number) {
    const user = await getById(id)  
    if (!user) {
        throw notFound('User not found')
    }
    const deletedUser = await remove(id)
    return deletedUser
}