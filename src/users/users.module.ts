import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { Module } from '@nestjs/common';
import { UserRespository } from './users.repository';
import { JwtModule } from 'src/jwt/jwt.module';
import { TypeOrmExModule } from 'src/repositories/custom-repository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRespository]),
  ],
  providers: [UserResolver, UserService, UserRespository],
  exports: [UserService, UserRespository],
})
export class UsersModule {}
