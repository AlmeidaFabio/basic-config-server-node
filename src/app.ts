import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import router from './routes'
import { errorHandler, notFoundRequest } from './middlewares/errorHandler'

const app = express()

app.use(helmet())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended:true }))
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(router)
app.use(notFoundRequest)
app.use(errorHandler)

export default app
