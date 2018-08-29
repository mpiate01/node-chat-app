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

    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    $('#messages').append(li);

})

socket.on('newLocationMsg', function (msg) {
    var li = $('<li></li>');
    var a = $(`<a target="_blank">My current location</a>`);

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);

    li.append(a);    
    $('#messages').append(li) ;   
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


var locationButton = $('#send-location')

locationButton.on('click', function () {
    //Check if navigator is supported
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location.');
    })
})