const express = require("express");
const router = express.Router();
const controller = require("../controller/fileUploadController");

router.post("/uploadImg", controller.imageUpload);
router.get("/getAllVacency", controller.getAllVacancies);
//contact us route
router.post("/contactUs", controller.contact);
router.get("/allContactData", controller.getAllContactData);

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const controller = require("../controller/fileUploadController");

// router.post("/uploadImg", controller.imageUpload);
// router.get("/getAllVacancy", controller.getAllVacancies); // Corrected endpoint name

// module.exports = router;
