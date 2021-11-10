import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ChildEntity } from './child.entity';

@Entity()
export class PersonEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  gender: string;
  @Column()
  married: boolean;
  @Column({ nullable: true })
  age: number;
  @OneToMany(
    _ => ChildEntity,
    child => child.father,
  )
  chidren: ChildEntity[];
}
