import { Router } from "express";
import { usersRouter } from './user'
import { authRendererRouter } from './auth'

const rendererRouter = Router()

rendererRouter.get('/', (req, res) => {
    res.render('index', {
        title: 'My Application',
        user: 'Default User'
    })
})

rendererRouter.use('/users', usersRouter)
rendererRouter.use('/', authRendererRouter)

export {
    rendererRouter
}