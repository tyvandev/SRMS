import { Entity, Column, OneToMany } from 'typeorm';
import { Result } from './Result';
import Model from './Model';

@Entity()
export class Student extends Model {
  @Column({
    name: 'first_name',
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'family_name',
    nullable: false,
  })
  familyName: string;

  @Column({
    name: 'email',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'birth_date',
    nullable: false,
  })
  birthDate: Date;

  @OneToMany('Result', 'student')
  result: Result[];
}
