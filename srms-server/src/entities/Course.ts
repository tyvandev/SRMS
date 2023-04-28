import { Entity, Column, OneToMany } from 'typeorm';
import Model from './Model';
import { Result } from './Result';

@Entity()
export class Course extends Model {
  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @OneToMany('Result', 'student')
  result: Result[];
}
