import 'dotenv/config'
import http from 'http'
import https from 'https'
import fs from 'fs'
import app from './app'

const runServer = (port: number, server:http.Server) => {
    server.listen(port, () => {
        console.log(`Server is running in Port ${port}`)
    })
}

const regularServer = http.createServer(app)
if(process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string)
    }
    const secServer = https.createServer(options, app)
    runServer(80, regularServer);
    runServer(443, secServer)
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000
    runServer(serverPort, regularServer)
}