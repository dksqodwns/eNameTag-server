import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from '../dto/request/create.board.dto';
import { BoardMetadataDto } from '../dto/request/board.metadata.dto';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('board')
  async findAll(@Query() metadata: BoardMetadataDto) {
    return this.boardService.findAllBoard(metadata);
  }

  @Post('board')
  async createBoard(dto: CreateBoardDto) {
    return this.boardService.createBoard(dto);
  }

  // TODO: 여러 사람이 눌렀을때 구분을 어떻게 할 수 있을까?
  @Post('board/:id/up')
  async thumbsUp(@Param('id') id: number) {
    return this.boardService.thumbsUpBoardById(id);
  }

  @Get('category')
  async findAllCategory() {
    return this.boardService.findAllCategory();
  }
}
