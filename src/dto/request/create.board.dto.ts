import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsNumber()
  @IsNotEmpty()
  category: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}
