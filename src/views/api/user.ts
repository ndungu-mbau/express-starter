import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { readAllUsers, getUserById } from "../../controllers/user";

const usersRouter = Router()

usersRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await readAllUsers()

    res.json({ users })
}))

usersRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const id: string = req.params.id as string

    const user = await getUserById(id)

    res.json({ user })
}))

export {
    usersRouter
}