var mongoose = require('mongoose');
var Scheme = mongoose.Scheme;


var conversationScheme = new Scheme({
    id: String,
    messages: [{
        usrid: String,
        usrname: String,
        msg: String,
        when: {
            type: Date,
            default: Date.now
        }
    }]
});


var conversationModel = mongoose.model('Conversation', conversationScheme);


module.exports = conversationModel;

