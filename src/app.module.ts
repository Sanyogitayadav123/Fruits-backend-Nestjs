import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserDataModule } from './user-data/user-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FruitsModule } from './fruits/fruits.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://sanyogitavkaps:ZUM8F2JsNhf5DN2y@nestcluster.gj6tgfr.mongodb.net/Redux-toolkit?retryWrites=true&w=majority"
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserDataModule,
    FruitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
