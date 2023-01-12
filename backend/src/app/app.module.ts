import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from '../track/track.module';
import { FileModule } from '../file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.kch6spa.mongodb.net/music-service?retryWrites=true&w=majority'),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ]
})
export class AppModule {}
