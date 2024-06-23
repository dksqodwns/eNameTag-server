import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { BaseTime } from './base.time.entity';

@Entity()
export class Board extends BaseTime {
  @PrimaryGeneratedColumn({ name: 'board_id' })
  id: number;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ type: 'longtext' })
  text: string;

  @Column({ name: 'thumbs_up' })
  thumbsUp: number;

  @ManyToOne(() => Category, (category) => category.board)
  category: Category;
}
