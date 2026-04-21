import express from "express"
import { config } from "dotenv"
import { apiRouter } from './views/api'
import { rendererRouter } from './views/renderer'
import path from "path"

config()

const app = express()

const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(express.urlencoded())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'templates'))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/health', (req, res) => {
    res.json({ message: "Application is up and healthy" })
})

app.use('/pages', rendererRouter)
app.use('/api', apiRouter)

app.listen(port, () => console.log(`Application running at port ${port}`))

