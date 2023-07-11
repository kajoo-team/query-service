'use strict'

let knexInstance = null

/**
 * Returns the current `knex` instance
 *
 * @param {knex} knex The `knex` instance (@see http://knexjs.org/#Installation-client)
 *
 * @return {knex} The `knex` instance object
*/
function getInstance(knex) {
  if (!knexInstance)
    knexInstance = knex

  return knexInstance
}

module.exports = getInstance