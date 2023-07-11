'use strict'

const chai = require('chai')
const chaiThings = require('chai-things')
const chaiShallowDeepEqual = require('chai-shallow-deep-equal')

chai.use(chaiThings)
chai.use(chaiShallowDeepEqual)
chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))

global.sinon = require('sinon')
global.expect = chai.expect

const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV])

require('../lib/configs/knexInstance')(knex)

global.db = knex

process
  .on('uncaughtException', () => {
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1)
    }
  })