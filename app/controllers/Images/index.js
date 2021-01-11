const logger = require('../../lib/logger');
const Response = require('../../commons/response');
const httpCode = require('../../commons/httpCode');

const ImagesService = require('../../services/images/index.js');

class Images extends ImagesService {
  /**
   *
   * @param {object} req The request object
   * @param {object} res The resposne object
   */
  async getImage(req, res) {
    try {
      let result = await this.getRandomImage(req.param.mood);
      if (result) {
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
            message: 'No image matching your mood',
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
}

module.exports = new Services();
