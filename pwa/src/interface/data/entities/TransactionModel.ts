import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column()
  stock_id: number

  @ManyToOne(() => StockInfoModel)
  @JoinColumn({
    name: 'stock_id',
    referencedColumnName: 'id',
  })
  stock_info: StockInfoModel
}
