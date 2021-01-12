const express = require('express');
const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');
// For the http response codes
const httpCode = require('../../commons/httpCode');
// For building the response object
const Response = require('../../commons/response');

const ImagesController = require('../../controllers/Images');

// For unimpleemnted routes
route.all(
  '/',
  asyncHandler((_req, _res) => {
    return Response.failure(
      res,
      {
        message: 'Route Not Implemented',
        response: { status: 403 },
      },
      httpCode.FORBIDDEN
    );
  })
);

// Retreiveing an image from the repo
route.get(
  '/getimage/:mood',
  asyncHandler((req, res) => ImagesController.getImage(req, res))
);

// Add an image to the repo
route.post(
  '/addimage',
  asyncHandler((req, res) => ImagesController.addImage(req, res))
);

module.exports = route;
