var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');
var conversationModel = require('./model/conversation.js');
var io = require('socket.io')(server);
var chat = io.of('/chat');

mongoose.connect('mongodb://localhost/chat');

app.use(express.static('public'));

chat.on('connection', function (socket) {
	// user join in a conversation
	socket.on('join', function (obj) {
		// join the conversation room
		socket.join(obj.conversationId);

		// query chat history for this conversation
		conversationModel.findOne({
			id: obj.conversationId
		}, function (err, conversation) {
			if (conversation) {
				socket.emit('chatHistory', conversation.messages);
			}
		});
	});

	// user leave  a conversation
	socket.on('leave', function (obj) {
		// join the conversation room
		socket.leave(socket.rooms);
	});

	// user send a chat message
	socket.on('chat', function (obj) {
		chat.to(obj.conversationId).emit('newMessage', obj);
		// socket.to(obj.conversationId).emit('newMessage', obj);
		// socket.emit('newMessage', obj);

		// persist the new message 
		conversationModel.findOne({
			id: obj.conversationId
		}, function (err, conversation) {
			if (!conversation) {
				conversation = new conversationModel({
					id: obj.conversationId,
					messages: []
				});
			}

			conversation.messages.push({
				usrid: obj.usrid,
				msg: obj.msg
			});

			conversation.save();
		});
	});
});


server.listen(8090, function () {
	console.log('listening on *:8090');
});