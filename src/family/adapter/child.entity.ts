import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PersonEntity } from './person.entity';

@Entity()
export class ChildEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @ManyToOne(
    _ => PersonEntity,
    person => person.chidren,
  )
  @JoinColumn({ name: 'father_id', referencedColumnName: 'id' })
  father: PersonEntity;
}
