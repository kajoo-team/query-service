'use strict'

require('dotenv')
  .config({
    silent: true
  })

module.exports = {
  test: {
    client      : 'pg',
    connection  : {
      host      : process.env.PG_HOST,
      port      : process.env.PG_PORT,
      database  : process.env.PG_DATABASE,
      user      : process.env.PG_USER,
      password  : process.env.PG_PASSWORD
    },
    pool        : {
      min: 2,
      max: 10
    },
    migrations  : {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    }
  }
}