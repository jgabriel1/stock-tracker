import * as fs from 'fs'
import * as path from 'path'
import { createConnection } from 'typeorm'

const pathToDatabase = path.resolve(__dirname, 'test_database.db')

describe('Database: Connection', () => {
  it('should be able to create an empty database file', async () => {
    const connection = await createConnection({
      type: 'sqlite',
      database: pathToDatabase,
    })

    const databaseFileExists = fs.existsSync(pathToDatabase)

    expect(databaseFileExists).toBe(true)

    if (databaseFileExists) {
      await connection.close()

      fs.unlinkSync(pathToDatabase)
    }
  })
})
