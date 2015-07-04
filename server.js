var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chat = io.of('/chat');


var chats = [{
    seq: 1,
    user: 'junshen',
    msg: 'hi, xinyue',
}, {
    seq: 2,
    user: 'xinyue',
    msg: 'whats up'
}, {
    seq: 3,
    user: 'xinyue',
    msg: 'zaofanchilema'
}, {
    seq: 4,
    user: 'junshen',
    msg: 'meichi, shentibushufu'
}];

app.use(express.static('public'));

chat.on('connection', function(socket) {
    // user join in a conversation
    socket.on('join', function(obj) {

        // join the conversation room
        socket.join(obj.conversationId);

        // load chat history and send to user
        socket.emit('chatHistory', chats );
    });

    // user send a chat message
    socket.on('chat', function(conversationId, msg) {
        socket.broadcast.to(conversationId).emit('newMessage', msg);

        // persist the new message 
    });
});


server.listen(8080, function() {
    console.log('listening on *:8080');
});
