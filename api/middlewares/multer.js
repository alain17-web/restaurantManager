// Importing the multer library to handle file uploads
const multer = require('multer');

// Importing the path module to work with file and directory path
const path = require('path');

// Importing the uuid library to generate unique IDs for file names
const { v4: uuidv4 } = require('uuid');

// Configuring the storage engine for multer, which determines where and how files are saved
const storage = multer.diskStorage({
    // Setting the destination for uploaded files
    // This callback function determines the directory where uploaded files will be stored
    destination: (req, file, cb) => {
        // Store files in the '../uploads/img' directory relative to this file's location
        cb(null, path.join(__dirname, '../uploads/img'));
    },
    // Setting the filename for uploaded files
    // This callback function defines how the uploaded files will be named
    filename: (req, file, cb) => {
        // Generate a unique ID for each file using uuidv4 to prevent name collisions
        const uniqueSuffix = uuidv4();

        // Extract the original file extension (e.g., '.jpg', '.png') from the uploaded file
        const extension = path.extname(file.originalname);

        // Combine the unique ID with the file extension to create the final filename
        cb(null, `${uniqueSuffix}${extension}`);
    }
});

// Initialize multer with the defined storage engine
const upload = multer({ storage });

module.exports = upload;