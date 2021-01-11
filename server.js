require('dotenv').config();

const app = require('./app/app');
const logger = require('./app/lib/logger');
const config = require('./app/lib/config');

module.exports = app.listen(config.port, () =>
  logger.info(`${config.appName} is listening on port ${config.port}`)
);
