import { Router } from "express";
import { userController } from "../../controllers";

const usersRouter = Router()


usersRouter.get('/', async (req, res) => {
    const { email } = req.query
    if (email && typeof email === 'string') {
        const user = await userController.findByEmail(email)
        res.json({ data: [user] })
        return
    }
    const data = await userController.findAll()
    res.json({ data })
})

usersRouter.get('/:id', async (req, res) => {
    const id: string = req.params.id as string
    const user = await userController.findById(id)
    res.json({ user })
})

usersRouter.post('/', async (req, res) => {
    const newUser = req.body
    const createdUser = await userController.create(newUser)
    res.json({ data: createdUser })
})

export {
    usersRouter
}