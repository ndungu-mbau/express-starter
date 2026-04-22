import { Router } from 'express'

import { userController } from '../../controllers'

const usersRouter = Router()

usersRouter.get('/', async (req, res) => {
    const { email } = req.query

    if (email) {
        const user = await userController.findByEmail(email as string)
        res.render('user', {
            user,
            title: `User with email ${email}`
        })
        return
    }

    const users = await userController.findAll()

    res.render('users', {
        users,
        title: 'All Users'
    })
})

usersRouter.get('/:id', async (req, res) => {
    const userId = req.params.id as string

    const user = await userController.findById(userId)

    if (!user) {
        return res.status(404).render('404', { title: "User not found", message: "User not found" })
    }

    res.render('user', {
        user,
        title: `User ${user.name}`
    })
})

export {
    usersRouter
}