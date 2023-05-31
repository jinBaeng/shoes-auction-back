import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { UserRespository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRespository,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    nickname,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.userRepository.existsUser({ email });
      if (exists) {
        return {
          ok: false,
          message: 'There is a user with that email already',
        };
      }
      const hash = await bcrypt.hash(password, 10);

      await this.userRepository.createUser(email, hash, nickname);
      return { ok: true, message: 'create account' };
    } catch (e) {
      return { ok: false, message: "Couldn't create account" };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    // make a JWT and give it to the user
    try {
      const user = await this.userRepository.existsUser(email);
      if (!user) {
        return {
          ok: false,
          message: 'User not found',
        };
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      console.log('kk');

      if (!passwordMatches)
        return {
          ok: false,
          message: 'Wrong password',
        };

      const token = this.jwtService.sign(user.id);
      console.log(token);
      return {
        ok: true,
        token,
        message: 'login user',
      };
    } catch (error) {
      return {
        ok: false,
        message: error,
      };
    }
  }

  async findById(userId: number): Promise<User> {
    return this.userRepository.getUserById(userId);
  }
}
