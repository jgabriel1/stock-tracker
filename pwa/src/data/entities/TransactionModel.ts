import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { StockInfoModel } from './StockInfoModel'

@Entity('transactions')
export class TransactionModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  value: number

  @Column()
  quantity: number

  @Column()
  type: 'income' | 'outcome'

  @Column()
  extra_costs: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToOne(() => StockInfoModel)
  @JoinColumn({
    name: 'stock_id',
    referencedColumnName: 'id',
  })
  stockInfo: StockInfoModel
}
