'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Query runner service
 * @class QueryService
*/
class QueryService {

  static get knex() { return require('../configs/knexInstance')() }

  /**
   * Runs the `queryPath`
   * @async
   *
   * @param {string} queryPath The `query` path (relative to project's root path)
   * @param {Object} params
   *
   * @return {Array} The returned `rows`
   *
   * @example
   * // queries/random.sql
   *  SELECT *
   *  FROM randomTable
   *  WHERE date >= :date
   *  AND active = :active
   *
   * // index.js
   *  const params = {
   *    date  : new Date(),
   *    active: true
   *  }
   *
   *  QueryService
   *    run('app/queries/random', params)
   *      .then(...)
   *      .catch(...)
   *
   * // [ { ... }, { ... }, ... ]
  */
  static async run(queryPath, params) {
    const absolutePath = path
      .resolve(`${queryPath}.sql`)

    const queryFile = fs
      .readFileSync(absolutePath)
      .toString()

    const queryString = QueryService.knex.raw(queryFile, params).toString()

    const result = await QueryService.knex.raw(queryString)

    return result.rows
  }

  /**
   * Returns the `query` from `fileName`
   *
   * @param {string} queryPath The `query` path (relative to project's root path)
   * @param {Object} params The `query` params
   *
   * @return {string} The `sql` query
  */
  static get(queryPath, params) {
    const filePath = path
      .resolve(`${queryPath}.sql`)

    const fileQuery = fs
      .readFileSync(filePath)
      .toString()

    return QueryService.knex.raw(fileQuery, params)
  }
}

module.exports = QueryService