const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    author:{type: String, require: true},
    location:{type: String, require: true},
    description:{type:String, require: true},
    image:{type:String, require: true},
    likes:{type: Number, require: true},
    date:{type:String, require:true}
});

const User = mongoose.model("InstaUserData", userSchema);
module.exports = User;