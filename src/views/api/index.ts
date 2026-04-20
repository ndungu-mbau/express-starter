import { Router } from "express";
import { usersRouter } from "./user";

const apiRouter = Router()

apiRouter.get('/', (req, res) => {
    res.json({ message: "API Router up and healthy" })
})

apiRouter.use('/users', usersRouter)

export {
    apiRouter
}