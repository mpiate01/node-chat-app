const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
//socket io config
const io = socketIO(server)

//*Serving static files in Express
app.use(express.static(publicPath))

//register an event listener
io.on('connection', (socket) => {   //check server side if there is a connection
    console.log('New user connected')

    //check if a tab has been closed -- server side
    socket.on('disconnect', () => {
        console.log('User was disconnected from server')
    })
})


//With http, si usa 'server' invece di 'app'
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

