import { Injectable } from '@nestjs/common';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Fruit } from './entities/fruit.entity';
import { Model } from 'mongoose';
import { FruitsDocument } from 'src/schema/fruits';

@Injectable()
  
export class FruitsService {
  constructor(
    @InjectModel("Fruits") private readonly fruitmodel: Model<FruitsDocument>,
  ) {}
  create(createFruitDto: CreateFruitDto,
    fruitImage: Express.Multer.File,) {
    const fruitData = new this.fruitmodel({
      ...createFruitDto,
      fruitImage : fruitImage?.filename
    })
    return fruitData.save();
  }

 async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
   const totalCount = await this.fruitmodel.countDocuments().exec();
   const fruits = await this.fruitmodel.find().skip(skip).limit(pageSize).exec();
   return { fruits, totalCount };
  //   return this.fruitmodel
  //     .find()
  //     .skip(skip)
  //     .limit(pageSize)
  //     .exec();
  //     totalCount
  }

  findOne(id: number) {
    return `This action returns a #${id} fruit`;
  }

  update(id: number, updateFruitDto: UpdateFruitDto) {
    return `This action updates a #${id} fruit`;
  }

  remove(id: number) {
    return `This action removes a #${id} fruit`;
  }
}
