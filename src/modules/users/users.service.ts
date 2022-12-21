import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { check } from 'prettier';
import { Transactional } from 'typeorm-transactional';
// import { Transactional } from 'typeorm-transactional';
import { CreateUserDto } from './create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findById(id: string) {
    const foundUser = await this.userRepository.getById(id);
    if (!foundUser) {
      throw new NotFoundException('User is not found');
    }

    return foundUser;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  @Transactional()
  async createUser(newUser: CreateUserDto) {
    // check user exist

    const checkUser = await this.userRepository.getByEmail(newUser.email);
    if (checkUser) {
      throw new ConflictException('Email already exists');
    }

    return this.userRepository.createUser(newUser);
  }
}
