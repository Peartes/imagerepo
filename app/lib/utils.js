// Import our cloudinary library
const cloudinary = require('cloudinary').v2;
// Streamify to convert files to streams of bytes
const streamify = require('streamifier');

class Utils {
  //  authenticate request parameters
  async authenticateParams(passedJson, neededFields) {
    const missingFields = [];
    neededFields[0].forEach((element) => {
      if (!passedJson.publicInfo[element]) {
        missingFields.push('publicInfo' + element);
      }
    });
    neededFields[1].forEach((element) => {
      if (!passedJson.personalInfo[element]) {
        missingFields.push('personalInfo: ' + element);
      }
    });
    return missingFields;
  }
  // Upload image to Cloudinary
  /**
   *
   * @param {File} data The image to upload
   * @param {String} key The file name or identifier for file
   * @returns response object with location field
   */
  async uploadToCloud(data, key, mood) {
    return new Promise((resolve, reject) => {
      let cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: mood + '/' + key,
        },
        (err, response) => {
          if (err) {
            return reject(err);
          }
          if (response) {
            return resolve(response);
          }
        }
      );
      try {
        streamify.createReadStream(data).pipe(cloudinaryStream);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new Utils();
