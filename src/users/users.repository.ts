import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { throws } from 'assert';
import { User } from './entities/user.entity';
import { CustomRepository } from 'src/repositories/custom-repository.decorater';

@Injectable()
@CustomRepository(User)
export class UserRespository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async existsUser(email) {
    try {
      const exists = await this.userRepository.findOne({
        where: { email },
      });
      return exists;
    } catch (error) {
      throws;
    }
  }

  async existsNickname(nickname) {
    try {
      const exists = await this.userRepository.findOneBy({ nickname });
      return exists;
    } catch (error) {
      throws;
    }
  }

  async createUser(email, password, nickname) {
    try {
      const user = await this.userRepository.save(
        this.userRepository.create({ email, password, nickname }),
      );
      return user;
    } catch (error) {
      throws;
    }
  }

  async getUserById(userId) {
    try {
      return await this.userRepository.findOne({
        select: ['id', 'nickname', 'email'],
        where: { id: userId },
      });
    } catch (error) {
      throw new HttpException("Can't Found", HttpStatus.BAD_REQUEST);
    }
  }
}
