var mongoose = require('mongoose');
//Create Schema for Users (template ish)
var FriendSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 3},
    age: {type:Number, required: true}
}, {timestamps: true})

//Store the Schema under the name 'User'
mongoose.model('Friend', FriendSchema);
