const mongoose = require("mongoose");

module.exports = async () => {
    return await mongoose.connect('mongodb://localhost/tribe');
}