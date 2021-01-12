/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const MongoDBHelper = require('..');
// Pretty logger
const logger = require('../../lib/logger');
// Our images model
const ImagesModel = require('../../models/Images/images');
// Helper functions
const utils = require('../../lib/utils');

class Images {
  constructor() {
    this.mongoDBInstance = new MongoDBHelper(ImagesModel);
  }

  /**
   * @summary Add one image to the database
   * @param {Buffer} data The image to add
   * @param {String} key The name of the file
   * @param {Array} moods The moods tagged with the iamge
   */
  async addSingleImage(data, key, moods) {
    // First we need to upload to cloudinary
    try {
      let result = await utils.uploadToCloud(data, moods[0]);
      // If everything came back fine, save the image url into the db along with its mood
      return this.mongoDBInstance.save({
        imageUri: result.secure_url,
        tags: moods,
      });
    } catch (error) {
      return new Error(error);
    }
  }

  /**
   *
   * @param {String} mood an object containing
   */
  async getRandomImage(mood) {
    return new Promise((resolve, reject) => {
      this.mongoDBInstance
        .getRandomImage(mood)
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
