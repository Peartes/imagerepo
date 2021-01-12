/* eslint-disable no-undef */
const appName = 'Therapeutic Image Repo';

const config = {
  appName,
  port: process.env.PORT || 3000,
  host: '127.0.0.1',
  outputDir: `${__dirname.replace('app/config', 'logs')}/`,
  mongo: {
    collections: {
      images: process.env.imageDB,
    },
  },
};
module.exports = config;
