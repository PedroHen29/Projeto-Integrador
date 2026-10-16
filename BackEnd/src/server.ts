import express, { Application } from "express";
import { AppDataSource } from "./database/dataSource";
import userRouter from "./routes/userRoutes";
import {errorMiddleware,notFoundMiddleware} from "./middlewares/errorMiddleware";
import cors from 'cors'
const app: Application = express()

const PORT: number = Number("3000")

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor rodando ')
})

app.use('/users', userRouter)
app.use(notFoundMiddleware)

app.use(errorMiddleware)

AppDataSource.initialize().then(() => {

    console.log('Servidor iniciado');

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })

}).catch((error) => {

    console.error('Erro ao tentar se conectar', error)

})