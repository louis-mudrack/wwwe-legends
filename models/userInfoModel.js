const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    // connections
    discord: String,
    apexAccount: String,
});

const userInfo = mongoose.model('UserInfo', userInfoSchema);
module.exports = userInfo;
