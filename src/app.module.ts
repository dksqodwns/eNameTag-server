import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { localOrmConfig } from '../config/local.orm.config';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: 'public',
      serveStaticOptions: {
        index: false,
      },
    }),
    BoardModule,
    localOrmConfig,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
