/* eslint-disable require-jsdoc */
'use strict'

const QueryService = require('../../lib/services/QueryService')

const TABLE_NAME = 'organizations'

describe('QueryService', () => {
  function addMock(params) {
    const paramsTemp = {
      name: `lala ${Math.round(Math.random() * 999999)}`,
      ...params
    }

    return db(TABLE_NAME)
      .insert(paramsTemp, 'id')
  }

  function addMocks(params, length = 3) {
    const promises = []

    for (let i = length - 1; i >= 0; i--) {
      promises
        .push(addMock(params))
    }

    return Promise.all(promises)
  }

  describe('.run', () => {
    context('when a list is returned', () => {
      let mockId

      before(async () => {
        mockId = (await addMock()).pop()

        await addMocks({ parent: mockId })
      })

      after(async () => await db(TABLE_NAME).del())

      it('returns the array of the objects found', async () => {
        const result = await QueryService
          .run('lib/queries/bfs', { id: mockId })

        const mocks = await db(TABLE_NAME)
          .where({ parent: mockId })
          .orWhere({ id: mockId })

        expect(result).to.shallowDeepEqual(mocks)
      })
    })
  })
})
