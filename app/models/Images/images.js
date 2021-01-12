/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const config = require('../../lib/config');

const mongoCollection = config.mongo.collections.images;

const ImagesSchema = new mongoose.Schema(
  {
    imageUri: String, // The uri of this image
    tags: [String], // Tags to identify this image with
  },
  {
    timestamps: true,
  }
);

ImagesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(mongoCollection, ImagesSchema);
