import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from '../dto/request/create.board.dto';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('board')
  async findAll() {
    return this.boardService.findAllBoard();
  }

  @Post('board')
  async createBoard(@Body() dto: CreateBoardDto) {
    console.log('controller: ', dto);
    return await this.boardService.createBoard(dto);
  }

  @Patch('board/:id/thumbs-up')
  async thumbsUp(@Param('id') id: number) {
    return this.boardService.incrementThumbsUp(id);
  }

  @Get('category')
  async findAllCategory() {
    return this.boardService.findAllCategory();
  }
}
