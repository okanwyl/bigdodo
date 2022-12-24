import { CourseEntity } from 'modules/course/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LessonType } from './lesson.enum';

@Entity({ name: 'lessons' })
export class LessonEntity {
  @PrimaryGeneratedColumn('increment')
  public no: number;

  @Column({ name: 'lesson_name' })
  public name: string;

  @Column({ type: 'enum', enum: LessonType })
  public type: LessonType;

  @Column({ name: 'lesson_content' })
  public content: string;

  @ManyToOne((type) => CourseEntity, (course) => course.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public course: CourseEntity;

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
