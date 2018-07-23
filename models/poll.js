var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poll_obj = new Schema({
    
    type: String,
        question: String,
        options: [],
        value: String,

    
})
var Poll = new Schema({
       
    polls: [poll_obj],
    poll_category: String,
    poll_date: {type: Date, default: Date.now},
    poll_due:{type: Date},
    poll_theme: {
        color: String,
        font: String,
        backgroundColor: String,
        position: String,
        width: String,
        borderRadius: String,
        padding: String
    },
    poll_response:[]
})

module.exports = mongoose.model("poll", Poll)