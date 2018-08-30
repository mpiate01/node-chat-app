// Initiating the request from the client to the server to open up a web socket
// and keep connection open
const socket = io();

function scrollToBottom () {
    //Selectors
    var messages = $('#messages');
    var newMsg = messages.children('li:last-child')
    //Heights
    var clientHeight = messages.prop('clientHeight');  //add property
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMsgHeight = newMsg.innerHeight();
    var lastMsgHeight = newMsg.prev().innerHeight()

    if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
        //should scroll
        console.log('should scroll')
    }
}

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
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom ();
    
    //without mustache template
    // console.log('newMsg', msg);
    // var formattedTime = moment(msg.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

    // $('#messages').append(li);

})

socket.on('newLocationMsg', function (msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        createdAt: formattedTime,
        url: msg.url
    });
    $('#messages').append(html);
    scrollToBottom ();

    // var li = $('<li></li>');
    // var a = $(`<a target="_blank">My current location</a>`);

    // li.text(`${msg.from} ${formattedTime}: `);
    // a.attr('href', msg.url);

    // li.append(a);    
    // $('#messages').append(li) ; 

})


$('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    var messageTextBox = $('[name=message]')

    socket.emit('createMsg', {
        from: 'User',
        text: messageTextBox.val()
    }, function (data) { //acknowledgment
        //console.log('Got it in the client -- ' + data);
        messageTextBox.val('') //empty field
    })    
})


var locationButton = $('#send-location')

locationButton.on('click', function () {
    //Check if navigator is supported
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    $(this).attr("disabled", "disabled").text('Sending location...'); //disable button while getting location

    navigator.geolocation.getCurrentPosition(function (position) {
        
        locationButton.removeAttr("disabled").text('Send location'); //unable button after sharing location
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        
        locationButton.removeAttr("disabled").text('Send location'); //unable button after sharing location
        alert('Unable to fetch location.');
    })
})