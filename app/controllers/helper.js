/* 
  This file contains functions and modules to help the controller perform it work. Codes that otherwise could not go into the controller or is used by many is put here to reduce repeating it.
*/
// Multer for reading the file sent in the body if the request
const multer = require('multer');

// The maxsize of image allowed
const maxSize = 1 * 1000 * 1000;

// The storage engine. For now save in disk while it write to our CDN
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|PDF|pdf)$/)
  ) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  return cb(null, true);
};

// Our File upload to storage initialisation
// module.exports.uploadMulti = multer({
//   storage,
//   fileFilter,
//   // limits: { fileSize: maxSize },
// }).fields([
//   { name: 'cv', maxCount: 1 },
//   { name: 'pic', maxCount: 1 },
// ]);

// Read file in the request body for single files. Field name is image
module.exports.readImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single('image');
