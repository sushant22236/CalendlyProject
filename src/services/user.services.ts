import {getAll, getById} from '../repositories/user.respositories'


export async function getAllUsers() {   
    const users = await getAll()
    return users
}

export async function getUserById(id: number) {
    const user = await getById(id)
    return user
}