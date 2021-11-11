import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  password: string;
}
