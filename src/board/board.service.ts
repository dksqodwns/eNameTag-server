import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board, Category } from '../../entity';
import { CreateBoardDto } from '../dto/request/create.board.dto';
import { isNil, pipe, throwIf } from '@fxts/core';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  @InjectRepository(Board) private readonly boardRepository: Repository<Board>;
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async findAllBoard(): Promise<Board[]> {
    return await this.boardRepository.find({
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findBoardById(id: number) {
    return pipe(
      await this.boardRepository.findOne({ where: { id } }),
      throwIf(
        isNil,
        () => new NotFoundException('존재하지 않는 게시물 입니다.'),
      ),
    );
  }

  async findCategoryById(id: number): Promise<Category> {
    return pipe(
      await this.categoryRepository.findOne({ where: { id } }),
      throwIf(
        isNil,
        () => new NotFoundException('카테고리를 찾을 수 없습니다.'),
      ),
    );
  }

  async createBoard(dto: CreateBoardDto): Promise<Board> {
    console.log('dto', dto);
    return await this.boardRepository.save({
      ...dto,
      category: await this.findCategoryById(Number(dto.category)),
    });
  }

  async incrementThumbsUp(id: number): Promise<Board> {
    const board = await this.findBoardById(id);
    board.thumbsUp += 1;
    return this.boardRepository.save(board);
  }
}
