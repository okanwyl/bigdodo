import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }

  async getAll() {
    return this.find();
  }

  async getByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  async createUser(newUser: CreateUserDto) {
    const user = new UsersEntity();
    user.email = newUser.email;
    user.firstName = newUser.firstname;
    user.lastName = newUser.lastname;
    await this.save(user);
  }
}
