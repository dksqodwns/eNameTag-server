import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const localOrmConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    // TODO: 환경에 따라 자동으로 바뀌도록 production 부분도 작성
    host: configService.get('LOCAL_HOST'),
    port: +configService.get('LOCAL_PORT'),
    username: configService.get('LOCAL_USERNAME'),
    password: configService.get('LOCAL_PASSWORD'),
    database: configService.get('LOCAL_DATABASE'),
    entities: [],
    synchronize: true,
  }),
  inject: [ConfigService],
});
