import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDatumDto } from './dto/create-user-datum.dto';
import { UpdateUserDatumDto } from './dto/update-user-datum.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserDataService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDatumDto: CreateUserDatumDto) {
    const hashedPassword = await bcrypt.hash(createUserDatumDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDatumDto,
      password: hashedPassword,
    });
    await createdUser.save();
    return { user: createdUser };
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} userDatum`;
  }

  update(id: number, updateUserDatumDto: UpdateUserDatumDto) {
    return `This action updates a #${id} userDatum`;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload);
        return {
          access_token,
          user,
        };
      }
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log('error', error)
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
