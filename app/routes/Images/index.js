const express = require('express');
const route = express.Router();

// used to enable catching and handling errors globally
const asyncHandler = require('express-async-handler');

const ImagesController = require('../../controllers/Images');

// For unimpleemnted routes
route.all('/', (_req, _res) => {
  return {
    error: true,
    code: 403,
    data: { status: 403, msg: 'Forbidden Route' },
    message: 'This route does not exists',
  };
});
// Retreiveing all states
route.get(
  '/:mood/:width/:height',
  asyncHandler((req, res) => ImagesController.getImage(req, res))
);

module.exports = route;
