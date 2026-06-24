import {getAll} from '../repositories/user.respositories'

export async function getAllUsers() {   
    const users = await getAll()
    return users
}