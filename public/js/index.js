// Initiating the request from the client to the server to open up a web socket
// and keep connection open
const socket = io()

//Check on client side if there is a connection
socket.on('connect', function () {
    console.log('Connected to server')

    //send email da client side
    socket.emit('createMsg', {
        from: 'email@gmail.it',
        text:'Dal client'
    })
})

socket.on('disconnect' , function () {
    console.log('Disconnected from server')
})

    //Listen to a custom event
    //Get email da server side
    // newEmail -> first argument
    // function(emited_data){} -> second argument

socket.on('newMsg', (newMsg) => {
    console.log('createEmail', newMsg)
})

