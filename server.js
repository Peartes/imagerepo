require('dotenv').config();

const app = require('./app/app');
const logger = require('./app/lib/logger');
const config = require('./app/lib/config');

module.exports = app.listen(config.port, () =>
  logger.info(`${config.appName} is listening on port ${config.port}`)
);
// If an error happens in our promises, quit app
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Error in a promise. Error is :', reason, promise);
  // process.exit(1);
});
