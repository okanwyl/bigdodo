import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDto } from './create-user.dto';
import { UsersEntity } from './users.entity';
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

  // @FIXME that need to changed
  async getAll() {
    return this.userRepository.getAll();
  }

  async findByEmail(email: string): Promise<UsersEntity | null> {
    return this.userRepository.getByEmail(email);
  }

  @Transactional()
  async createUser(newUser: CreateUserDto): Promise<UsersEntity | void> {
    // check user exist

    const checkUser = await this.userRepository.getByEmail(newUser.email);
    if (checkUser) {
      throw new ConflictException();
    }

    return this.userRepository.createUser(newUser);
  }

  // @TODO Fix that when auth is implemented and clean the code
  async updateUser(
    id: string,
    updateRequest: CreateUserDto,
  ): Promise<null | UsersEntity> {
    const checkUser = await this.userRepository.getById(id);
    if (!checkUser) {
      throw new NotFoundException('User is not founded');
    }
    if (checkUser.email == updateRequest.email) {
      await this.userRepository.update(id, {
        ...(updateRequest.firstname && { firstName: updateRequest.firstname }),
        ...(updateRequest.lastname && { lastName: updateRequest.lastname }),
      });
    } else {
      const checkEmail = await this.userRepository.getByEmail(
        updateRequest.email,
      );
      if (!checkEmail) {
        await this.userRepository.update(id, {
          ...(updateRequest.email && {
            email: updateRequest.email,
          }),
          ...(updateRequest.firstname && {
            firstName: updateRequest.firstname,
          }),
          ...(updateRequest.lastname && { lastName: updateRequest.lastname }),
        });
      } else {
        throw new ConflictException();
      }
    }
    return this.userRepository.getById(id);
  }
}
