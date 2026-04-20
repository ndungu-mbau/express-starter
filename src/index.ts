import express from "express"
import { config } from "dotenv"

config()

const app = express()

const port = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/health', (req, res) => {
    res.json({ message: "Application is up and healthy" })
})

app.listen(port, () => console.log(`Application running at port ${port}`))

