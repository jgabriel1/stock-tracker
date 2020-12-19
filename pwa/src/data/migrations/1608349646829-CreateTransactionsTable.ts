import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTransactionsTable1608349646829
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'value',
            type: 'integer',
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'type',
            type: 'text',
            enum: ['income', 'outcome'],
          },
          {
            name: 'extra_costs',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'datetime',
          },
          {
            name: 'updated_at',
            type: 'datetime',
          },
          {
            name: 'stock_id',
            type: 'integer',
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
