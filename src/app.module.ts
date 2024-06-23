import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { localOrmConfig } from '../config/local.orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BoardModule,
    localOrmConfig,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
