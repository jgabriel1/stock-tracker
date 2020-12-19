import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('stock_infos')
export class StockInfoModel {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  ticker: string

  @Column()
  full_name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
