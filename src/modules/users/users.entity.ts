import { Role } from 'modules/roles/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'email', unique: true })
  public email: string;

  @Column({ name: 'first_name', nullable: true, default: '' })
  public firstName: string;

  @Column({ name: 'last_name', nullable: true, default: '' })
  public lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public roles: Role;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
