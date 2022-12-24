import { Exclude, Expose } from 'class-transformer';
import { GradeLevel } from 'common/enums/grade.enum';
import { LessonEntity } from 'modules/lesson/lesson.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'courses' })
export class CourseEntity {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'course_name', unique: true })
  public name: string;

  @Generated('increment')
  @Column({ name: 'no', unique: true })
  public no: number;

  @Column({ name: 'course_slug', unique: true })
  public slug: string;

  @Column({ name: 'course_description' })
  public description: string;

  @Column({ type: 'enum', enum: GradeLevel, default: GradeLevel.A1 })
  public gradeLevel: GradeLevel;

  @OneToMany((type) => LessonEntity, (lesson) => lesson.course, { eager: true })
  public lessons: LessonEntity[];

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
