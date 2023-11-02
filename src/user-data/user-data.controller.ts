import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { CreateUserDatumDto } from './dto/create-user-datum.dto';
import { UpdateUserDatumDto } from './dto/update-user-datum.dto';

@Controller('user-data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService,
   ) { }

  @Post('/user-register')
  create(@Body() createUserDatumDto: CreateUserDatumDto) {
    return this.userDataService.create(createUserDatumDto);
  }

  @Get('/user-find')
  findAll() {
    return this.userDataService.findAll();
  }

  @Get('/user-find/ID:id')
  findOne(@Param('id') id: string) {
    return this.userDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDatumDto: UpdateUserDatumDto) {
    return this.userDataService.update(+id, updateUserDatumDto);
  }

  @Delete('/remove-user/:id')
  remove(@Param('id') id: string) {
    return this.userDataService.remove(id);
  }

  @Post('/login')
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.userDataService.login(email, password);
  }
}
