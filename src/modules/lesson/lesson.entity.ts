import { CourseEntity } from 'modules/course/course.entity';
import { QuizEntity } from 'modules/quiz/quiz.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LessonType } from './lesson.enum';

@Entity({ name: 'lessons' })
export class LessonEntity {
  @PrimaryGeneratedColumn('increment')
  public no!: number;

  @Column({ name: 'lesson_name', nullable: false })
  public name!: string;

  @Column({ type: 'enum', enum: LessonType, nullable: false })
  public type!: LessonType;

  @Column({
    name: 'lesson_content',
    default: '',
    nullable: false,
    type: 'text',
  })
  public content!: string;

  @ManyToOne((type) => CourseEntity, (course) => course.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public course: CourseEntity;

  @OneToMany((type) => QuizEntity, (quiz) => quiz.lesson)
  @JoinColumn()
  public quiz: QuizEntity[];

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
