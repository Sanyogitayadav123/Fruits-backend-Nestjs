import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: ' QWERTYUIOPASDFGHJKL',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserDataController],
  providers: [UserDataService],
})
export class UserDataModule {}
