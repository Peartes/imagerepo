/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const MongoDBHelper = require('..');
const logger = require('../../lib/logger');
const ImagesModel = require('../../models/Images/images');

class Images {
  constructor() {
    this.mongoDBInstance = new MongoDBHelper(ImagesModel);
  }

  // Add a record in the database
  addImages(data) {
    logger.info('IN-COMING DATA', data);
    return this.mongoDBInstance.save(data);
  }

  // Check if a record exists
  async checkServices(param) {
    logger.info('IN-COMING PARAM', param);
    const service = await this.mongoDBInstance.get(param);
    return service !== undefined && service != null;
  }

  /**
   *
   * @param {String} mood an object containing
   */
  async getRandomImage(mood) {
    logger.info('IN-COMING PARAM', param);
    return new Promise((resolve, reject) => {
      this.mongoDBInstance
        .getRandomImage(param)
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = Images;
