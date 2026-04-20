import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users, type User, type NewUser } from '../models'

export const readAllUsers = async (): Promise<User[]> => {
    const usersResult: User[] = await db.select().from(users)
    return usersResult
}

export const getUserById = async (id: string)  => {
    const userResult = await db.query.users.findFirst({
        where: eq(users.id, id)
    })

    return userResult
} 