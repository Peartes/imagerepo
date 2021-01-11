/* eslint-disable */
/**
 * This file scans through the current directory using each file as a route with the name of the file(without the extension) as the route
 * @param app
 */
const ImagesRoute = require('./Images');

module.exports = (app) => {
  app.use(`/images`, require(ImagesRoute));
};
