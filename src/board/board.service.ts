import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board, Category } from '../../entity';
import { CreateBoardDto } from '../dto/request/create.board.dto';
import { isNil, pipe, throwIf } from '@fxts/core';
import { BoardMetadataDto } from '../dto/request/board.metadata.dto';

@Injectable()
export class BoardService {
  private readonly boardRepository: Repository<Board>;
  private readonly categoryRepository: Repository<Category>;

  async findAllBoard(metadata: BoardMetadataDto) {
    // TODO: 쿼리 옵션 넣어줘서 최신순 정렬 및 카테고리, 시간, 추천 별 정렬
    return this.boardRepository.findAndCount({});
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
    return await this.boardRepository.save({
      ...dto,
      category: await this.findCategoryById(dto.category),
    });
  }

  async thumbsUpBoardById(id: number): Promise<Board> {
    return pipe(
      await this.findBoardById(id),
      (board) => (board.thumbsUp += 1),
      async () => await this.findBoardById(id),
    );
  }
}
