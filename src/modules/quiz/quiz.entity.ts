import { Exclude } from 'class-transformer';
import { LessonEntity } from 'modules/lesson/lesson.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'quiz' })
export class QuizEntity {
  @PrimaryGeneratedColumn('increment')
  public no: number;

  @Column({ name: 'description', nullable: false, default: '' })
  public description: string;

  // @TODO thought correctly
  @ManyToOne((type) => LessonEntity, (lesson) => lesson.quiz, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  public lesson: LessonEntity;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;


  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
