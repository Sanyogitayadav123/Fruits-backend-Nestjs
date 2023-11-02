import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}
  @Post('/add-fruit')
  @UseInterceptors(FileInterceptor('fruitImage'))
  create(
    @Body() createFruitDto: CreateFruitDto,
    @UploadedFile() fruitImage: Express.Multer.File
  ) {
    return this.fruitsService.create(createFruitDto,fruitImage);
  }

  @Get('/get-fruit')
  findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.fruitsService.findAll(page, pageSize);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFruitDto: UpdateFruitDto) {
    return this.fruitsService.update(+id, updateFruitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(+id);
  }
}
