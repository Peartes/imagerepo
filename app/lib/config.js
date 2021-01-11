/* eslint-disable no-undef */
const appName = 'Therapeutic Image Repo';

const config = {
  appName,
  appBaseUrl: process.env.APP_BASE_URL,
  port: process.env.PORT || 3000,
  host: '127.0.0.1',
  outputDir: `${__dirname.replace('app/config', 'logs')}/`,
  mongo: {
    collections: {
      Images: process.env.imageDb,
    },
  },
};
module.exports = config;
