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

//usually, io.on verra' usato solo con connect and disconnect
//vari event listeners verranno messi all'interno
io.on('connection', (socket) => {   //check server side if there is a connection

    //register an event listener
    console.log('New user connected')

    //TO emit events (creating) is similar to a listener
    //Send data da server side

    socket.emit('newMsg', {
        from: 'email@gmail.it',
        text:'Dal server',
        createdAt: new Date().getTime() 
    })

    //Get email da client side
    socket.on('createMsg', (msg) => {
        //add created time
        msg.createdAt = new Date().getTime() 
        console.log('Created Message: ', msg)
    })

    //check if a tab has been closed -- server side
    socket.on('disconnect', () => {
        console.log('User was disconnected from server')
    })
})


//With http, si usa 'server' invece di 'app'
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})



 //newMessage event, server to client   from,text, createdAt
 //createMessage event, client to server   from,text   (createdAt creata dal server per evitare che il client la modifichi)
