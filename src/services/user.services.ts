import {getAll, getById} from '../repositories/user.respositories'


export async function getAllUsers() {   
    const users = await getAll()
    return users
}

export async function getUserById(id: number) {
    const user = await getById(id)
    if (!user) {
        throw new Error(`User with id ${id} not found`)
    }
    return user;
}