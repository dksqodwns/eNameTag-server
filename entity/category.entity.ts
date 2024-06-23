import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column({ name: 'category_name' })
  categoryName: string;

  @OneToMany(() => Board, (board) => board.category)
  board: Board[];
}
