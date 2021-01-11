const multer = require('multer');

const maxSize = 1 * 1000 * 1000;
// const storage = multer.diskStorage({
//   destination: (_req, _file, callback) => {
//     callback(null, '/tmp/uploads');
//   },
//   // TODO: Change filename to the user email
//   filename: (req, file, callback) => {
//     callback(null, req.body.email + file.originalname);
//   },
// });
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|PDF|pdf)$/)
  ) {
    req.fileValidationError = 'Only image or pdf files are allowed!';
    return cb(new Error('Only image  or pdf files are allowed!'), false);
  }
  return cb(null, true);
};

// Fields needed for the tuttor registration
module.exports.tuttorFields = [
  ['firstname', 'lastname', 'gender'],
  [
    'email',
    'password',
    'phoneNumber',
    'address1',
    'country',
    'state',
    'location',
    'landMark',
  ],
];

// Our FIle upload to storage
module.exports.uploadMulti = multer({
  storage,
  fileFilter,
  // limits: { fileSize: maxSize },
}).fields([
  { name: 'cv', maxCount: 1 },
  { name: 'pic', maxCount: 1 },
]);

// Our FIle upload to storage
module.exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single('cv');
