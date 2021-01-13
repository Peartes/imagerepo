const logger = require('../../lib/logger');
// For building the response object
const Response = require('../../commons/response');
// For setting the httpcode of the response
const httpCode = require('../../commons/httpCode');
// For handling reading the image file from the request object and file validation
const { readImage } = require('../helper');
const ImagesService = require('../../services/images/index.js');

class Images extends ImagesService {
  /**
   * @summary Get a random image based on your mood
   * @param {object} req The request object
   * @param {object} res The resposne object
   */
  async getImage(req, res) {
    try {
      let result = await this.getRandomImage(req.params.mood);
      if (result.length > 0) {
        // If we got an image for this particular mood, return them
        return Response.success(
          res,
          {
            message: 'Gotten an image matching your mood',
            response: { status: 200, image: result },
          },
          httpCode.OK
        );
      } else {
        // Otherwise
        return Response.failure(
          res,
          {
            message:
              'No image matching your mood. We are growing, so we shoud have them soon.',
            response: { status: 404 },
          },
          httpCode.NOT_FOUND
        );
      }
    } catch (error) {
      logger.error('An error occured getting an image for this mood :(');
      return Response.failure(
        res,
        {
          message: 'Error getting an image :(',
          response: error,
        },
        httpCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @summary add an image tagged with your mood
   * @param {object} req The request object
   * @param {object} res The resposne object
   */
  async addImage(req, res) {
    try {
      // First read the files from the request object
      readImage(req, res, async (e) => {
        // CHeck if file exist
        if (!req.file || !req.file.buffer) {
          return Response.failure(
            res,
            {
              message: 'no image to upload',
              response: { status: 400 },
            },
            httpCode.BAD_REQUEST
          );
        }
        // Check if the image read was of the right file type
        if (req.fileValidationError) {
          return Response.failure(
            res,
            {
              message: 'incorrect file type',
              response: req.fileValidationError,
            },
            httpCode.BAD_REQUEST
          );
        }
        // Check if there was any other error
        if (e) {
          return Response.failure(
            res,
            { message: 'error reading image', response: e },
            httpCode.BAD_REQUEST
          );
        }
        // logger.info('File validation complete');
        // Parse the body to a json object
        req.body.moods = JSON.parse(req.body.moods);
        // Addd the image to the database
        let result = await this.addSingleImage(
          req.file.buffer,
          req.file.originalname,
          req.body.moods
        );
        if (Object.keys(result).length > 0) {
          // If we got an image for this particular mood, return them
          return Response.success(
            res,
            {
              message: 'Added your image. Thank you for contributing',
              response: { status: 200, image: result },
            },
            httpCode.OK
          );
        } else {
          // Otherwise
          return Response.failure(
            res,
            {
              message: 'Error Adding your image :(',
              response: { status: 404 },
            },
            httpCode.NOT_FOUND
          );
        }
      });
    } catch (error) {
      logger.error('An error occuredadding your image for this mood :(');
      return Response.failure(
        res,
        {
          message: 'Error adding image :(',
          response: error,
        },
        httpCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = new Images();
