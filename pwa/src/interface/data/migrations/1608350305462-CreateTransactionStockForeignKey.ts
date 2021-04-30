import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class CreateTransactionStockForeignKey1608350305462
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionStockInfo',
        columnNames: ['stock_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'stock_infos',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionStockInfo')
  }
}
