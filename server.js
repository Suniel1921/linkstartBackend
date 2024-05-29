const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const fileUploadRoute = require("./routes/fileUploadRoute");
const dbConnection = require("./config/dbConn");
const cors = require("cors");
const fileUpload = require('express-fileupload');

// Middleware for file upload
app.use(fileUpload({ useTempFiles: true, tempFileDir: './temp' }));

// Middleware for cloudinary connection
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
dbConnection();

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Link Star");
});

// Middleware
app.use('/api/v1/upload', fileUploadRoute);

app.listen(port, () => {
    console.log(`Server is running on port no: ${port}`);
});
