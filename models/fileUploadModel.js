const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
    images: [{
        type: String,
    }],
    position: {
        type: String,
        required: true,
    },
    vacancy: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    accommodation: {
        type: String,
        required: true,
    },
    transportation: {
        type: String,
        required: true,
    },
    overtime: {
        type: String,
        required: true,
    }
},{timestamps:true});

const fileUploadModel = mongoose.model('fileUploads', fileUploadSchema);
module.exports = fileUploadModel;
