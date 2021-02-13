import * as fs from 'fs'
import * as path from 'path'
import { Connection, createConnection } from 'typeorm'

describe('@Database: Connection', () => {
  const pathToDatabase = path.resolve(__dirname, 'test_database.db')

  let connection: Connection

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: pathToDatabase,
    })
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create an empty database file', async () => {
    const databaseFileExists = fs.existsSync(pathToDatabase)

    expect(databaseFileExists).toBe(true)
  })
})
