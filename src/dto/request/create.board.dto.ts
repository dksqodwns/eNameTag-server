import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, { message: '닉네임은 10글자를 넘을 수 없습니다.' })
  nickName: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
