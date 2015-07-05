var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var conversationSchema = new Schema({
    id: String,
    messages: [{
        usrid: String,
        msg: String,
        when: {
            type: Date,
            default: Date.now
        }
    }]
});


var conversationModel = mongoose.model('Conversation', conversationSchema);


module.exports = conversationModel;

