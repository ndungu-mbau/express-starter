import express from "express"
import { config } from "dotenv"
import path from "path"
import cookieParser from "cookie-parser"

import { sessionMiddleware } from "./lib/middleware/auth";
import { apiRouter } from './views/api'
import { rendererRouter } from './views/renderer'

config()

const app = express()

const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'templates'))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use(sessionMiddleware)

app.use('/pages', rendererRouter)
app.use('/api', apiRouter)
// app.use((err: Error, req: express.Request, res: express.Response) => {
//     console.error(err)
//     res.status(500).json({ error: `Internal Server Error: ${err.message}` })
// })

app.listen(port, () => console.log(`Application running at port ${port}`))

