const logger = require('../lib/logger');

class MongoDBHelper {
  /**
   * The constructor
   * @param mongodbModel - the model you wish to operate on
   */
  constructor(mongodbModel) {
    this.mongodbModel = mongodbModel;
  }

  /**
   * Fetches a single record randomly from the connected MongoDB instance.
   *
   * @param {String} mood the mood of the picture
   */
  getRandomImage(mood) {
    return new Promise((resolve, reject) => {
      return this.mongodbModel
        .aggregate([{ $match: { tags: { $in: mood } } }])
        .lean()
        .then((docs) => {
          return resolve(docs);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  /**
   * Fetches a single record from the connected MongoDB instance.
   *
   * @param params
   * @returns {Promise}
   */
  get(params) {
    return new Promise((resolve, reject) => {
      const param = params.query || params;
      const query = this.mongodbModel.findOne(param);

      if (params.fields) {
        query.select(params.fields);
      }

      return query.exec((err, modelData) => {
        if (err) {
          return reject(MongoDBHelper.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }

  /**
   * Fetches bulk records from the connected MongoDB instance.
   *
   * @param params
   * @returns {Promise}
   */
  getBulk(params) {
    return new Promise((resolve, reject) => {
      const parameter = params;

      const query =
        params === undefined
          ? this.mongodbModel.find()
          : this.mongodbModel.find(parameter.conditions);

      if (params && parameter.fields) {
        query.select(params.fields);
      }

      if (params && parameter.sort) {
        query.sort(parameter.sort);
      }

      return query.exec((error, modelData) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(modelData);
      });
    });
  }

  /**
   * Fetches bulk records with pagination from the connected MongoDB instance.
   *
   * @param params the parameter for mongoose pagination
   * @returns {Promise}
   */
  getBulkPaginated(params) {
    const {
      page = 1,
      sort,
      limit = 10,
      query,
      select = '',
      lean = true,
      leanWithId = false,
    } = params;
    try {
      if (params !== undefined) {
        return this.mongodbModel.paginate(query, {
          select: `${select}`,
          sort,
          page,
          limit: parseInt(limit, 0),
          lean,
          leanWithId,
        });
      }
      return this.mongodbModel.find();
    } catch (e) {
      return logger.info('error', e);
    }
  }

  /**
   * Saves data into the MongoDB instance
   *
   * @param data
   * @returns {Promise}
   */
  save(data) {
    return new Promise((resolve, reject) => {
      const mongodbSaveSchema = this.mongodbModel(data);
      return mongodbSaveSchema.save((error, result) => {
        if (error != null) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(result);
      });
    });
  }

  /**
   * Saves bulk data into the MongoDB instance
   *
   * @param data of Array
   * @returns {Promise}
   */
  saveBulk(data) {
    return new Promise((resolve, reject) =>
      this.mongodbModel.insertMany(data, (error, result) => {
        if (error != null) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(result);
      })
    );
  }

  /**
   *
   * @param params the query string
   */

  deleteOne(params) {
    return new Promise((resolve, reject) =>
      this.mongodbModel.deleteOne(params, (error, response) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(response);
      })
    );
  }

  /**
   * Delete MULTIPLE RECORDS from the MongoDB instance's DB based on some conditional criteria
   *
   * @param params - the conditional parameters
   * @returns {Promise}
   */
  deleteBulk(params) {
    return new Promise((resolve, reject) =>
      this.mongodbModel.remove(params.conditions, (error, response) => {
        if (error) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(response);
      })
    );
  }
  /**
   * Used to format the error messages returned from the MongoDB server during CRUD operations
   *
   * @param report
   * @returns {{error: boolean, message: *}}
   */
  static handleError(report) {
    return { error: true, msg: report };
  }
}

module.exports = MongoDBHelper;
