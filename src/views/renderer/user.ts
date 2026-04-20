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

export {
    usersRouter
}