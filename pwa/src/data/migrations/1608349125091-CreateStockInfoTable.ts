import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateStockInfoTable1608349125091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stock_infos',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ticker',
            type: 'text',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'full_name',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: "datetime('now')",
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: "datetime('now')",
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stock_infos')
  }
}
