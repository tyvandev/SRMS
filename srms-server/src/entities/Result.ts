import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import Model from './Model';
import { Student } from './Student';
import { Course } from './Course';

@Entity()
export class Result extends Model {
  @Column({
    nullable: false,
    name: 'course_id',
  })
  courseId: number;

  @Column({
    name: 'student_id',
    nullable: false,
  })
  studentId: number;

  @Column({
    name: 'score',
    nullable: false,
  })
  score: string;

  @ManyToOne('Student', 'results', {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne('Course', 'results', {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;
}
