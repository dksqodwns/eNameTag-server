import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  // @IsNotEmpty()
  // @MaxLength(10, { message: '닉네임은 10글자를 넘을 수 없습니다.' })
  nickName: string;

  @IsString()
  // @IsNotEmpty({ message: '카테고리를 반드시 설정해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
