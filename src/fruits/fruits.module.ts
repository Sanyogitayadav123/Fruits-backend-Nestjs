import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fruits, FruitsSchema } from 'src/schema/fruits';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './function/fruitimg.function';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Fruits", schema: FruitsSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/fruit-image', // Specify your upload directory
        filename: editFileName, // Use your custom filename function here
      }),
    }),
    
  ],
  controllers: [FruitsController],
  providers: [FruitsService],
})
export class FruitsModule {}
