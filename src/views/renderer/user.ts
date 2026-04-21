import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'

import { readAllUsers, getUserById } from '../../controllers/user'

const usersRouter = Router()

usersRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await readAllUsers()

    res.render('users', {
        users,
        title: 'All Users'
    })
}))

usersRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const userId = req.params.id as string

    const user = await getUserById(userId)

    if (!user) {
        return res.status(404).render('404', { title: "User not found", message: "User not found" })
    }

    res.render('user', {
        user,
        title: `User ${user.name}`
    })
}))

export {
    usersRouter
}