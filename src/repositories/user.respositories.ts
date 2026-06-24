import {prisma} from '../config/database'

export async function getAll(){
    const users = await prisma.user.findMany()
    return users
}