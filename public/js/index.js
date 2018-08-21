// Initiating the request from the client to the server to open up a web socket
// and keep connection open
const socket = io();

//Check on client side if there is a connection
socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('disconnect' , function () {
    console.log('Disconnected from server');
})

    //Listen to a custom event
    //Get email da server side
    // newEmail -> first argument
    // function(emited_data){} -> second argument

socket.on('newMsg', function (msg) {
    console.log('newMsg', msg);

    var li = $('<li></li>')
    li.text(`${msg.from}: ${msg.text}`)

    $('#messages').append(li)

})


$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMsg', {
        from: 'User',
        text: $('[name=message]').val()
    }, function (data) { //acknowledgment
        console.log('Got it in the client -- ' + data);
    })    
})