// const cloudinary = require("cloudinary").v2;
// const fileUploadModel = require("../models/fileUploadModel");

// async function isFileSupported(type) {
//     const supportedTypes = ['jpg', 'jpeg', 'png'];
//     return supportedTypes.includes(type);
// }

// async function uploadFileToCloudinary(file, folder, quality) {
//     const options = { folder, resource_type: 'auto' };
//     if (quality) {
//         options.quality = quality;
//     }
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

// exports.imageUpload = async (req, res) => {
//     try {
//         const { position, vacancy, food, salary, accommodation, transportation, overtime } = req.body;
//         const files = req.files && req.files.images;

//         if (!files) {
//             return res.status(400).json({ success: false, message: "No files uploaded" });
//         }

//         const fileArray = Array.isArray(files) ? files : [files];

//         const fileUploadPromises = fileArray.map(async file => {
//             const fileType = file.name.split('.').pop().toLowerCase();
//             if (!(await isFileSupported(fileType))) {
//                 throw new Error('File format is not supported');
//             }
//             const response = await uploadFileToCloudinary(file, 'userImages', 90);
//             return response.secure_url;
//         });

//         const uploadedImages = await Promise.all(fileUploadPromises);

//         const fileData = await fileUploadModel.create({
//             images: uploadedImages,
//             position,
//             vacancy,
//             salary,
//             food,
//             accommodation,
//             transportation,
//             overtime,
//         });

//         return res.status(201).json({ success: true, message: 'User created successfully', fileData });
//     } catch (error) {
//         console.error("Error while uploading files:", error);
//         return res.status(500).json({ success: false, message: `Error while uploading files: ${error.message}` });
//     }
// };




// //get all vacency
// exports.getAllVacancies = async (req, res) => {
//     try {
//         const vacancies = await fileUploadModel.find();
//         if (vacancies.length === 0) {
//             return res.status(404).json({ success: false, message: 'No vacancies found' });
//         }
//         return res.status(200).json({ success: true, data: vacancies });
//     } catch (error) {
//         console.error("Error while fetching vacancies:", error);
//         return res.status(500).json({ success: false, message: `Error while fetching vacancies: ${error.message}` });
//     }
// };













const cloudinary = require("cloudinary").v2;
const contactModel = require("../models/contactModel");
const fileUploadModel = require("../models/fileUploadModel");

async function isFileSupported(type) {
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder, resource_type: 'auto' };
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { position, vacancy, food, salary, accommodation, transportation, overtime } = req.body;
        const files = req.files && req.files.image; // Corrected field name to 'image'

        if (!files) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const fileArray = Array.isArray(files) ? files : [files];

        const fileUploadPromises = fileArray.map(async file => {
            const fileType = file.name.split('.').pop().toLowerCase();
            if (!(await isFileSupported(fileType))) {
                throw new Error('File format is not supported');
            }
            const response = await uploadFileToCloudinary(file, 'userImages', 90);
            return response.secure_url;
        });

        const uploadedImages = await Promise.all(fileUploadPromises);

        const fileData = await fileUploadModel.create({
            images: uploadedImages,
            position,
            vacancy,
            salary,
            food,
            accommodation, // Corrected field name to 'accommodation'
            transportation,
            overtime,
        });

        return res.status(201).json({ success: true, message: 'User created successfully', fileData });
    } catch (error) {
        console.error("Error while uploading files:", error);
        return res.status(500).json({ success: false, message: `Error while uploading files: ${error.message}` });
    }
};

exports.getAllVacancies = async (req, res) => {
    try {
        const vacancies = await fileUploadModel.find();
        if (vacancies.length === 0) {
            return res.status(404).json({ success: false, message: 'No vacancies found' });
        }
        return res.status(200).json({ success: true, data: vacancies });
    } catch (error) {
        console.error("Error while fetching vacancies:", error);
        return res.status(500).json({ success: false, message: `Error while fetching vacancies: ${error.message}` });
    }
};






//contact us controller
exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const newContactData = await contactModel.create({ name, email, message }); 
        return res.status(201).json({ success: true, message: 'Thanks for contacting us', newContactData });
    } catch (error) {
        console.error('Error in contact controller:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};


//get all contact data
exports.getAllContactData = async (req, res) => {
    try {
        const allContactData = await contactModel.find(); 
        return res.status(200).json({ success: true, data: allContactData });
    } catch (error) {
        console.error('Error in getAllContactData controller:', error); 
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
