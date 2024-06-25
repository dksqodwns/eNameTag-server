import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board, Category } from '../../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Category])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
