// Import our cloudinary library
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  // eslint-disable-next-line no-undef
  cloud_name: process.env.cloudinaryCloudName,
  // eslint-disable-next-line no-undef
  api_key: process.env.cloudinaryApiKey,
  // eslint-disable-next-line no-undef
  api_secret: process.env.cloudinaryApiSecret,
});
// Streamify to convert files to streams of bytes
const streamify = require('streamifier');

class Utils {
  /**
   * @summary Upload an image to cloudinary
   * @param {File} data The image to upload
   * @param {String} key The file name or identifier for file
   * @param {String} mood The mood of teh image
   * @returns response object with location field
   */
  async uploadToCloud(data, mood) {
    return new Promise((resolve, reject) => {
      let cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder: 'shopify/' + mood,
          overwrite: true,
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
