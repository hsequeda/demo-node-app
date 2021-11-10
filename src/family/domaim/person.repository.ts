import { Result } from 'fpts-monads';
import { Person } from './person';
import { Child } from './child';

export interface IPersonRepository {
  save(newPerson: Person): Result<void>;
  getOne(): Result<Person>;
  remove(): Result<void>;
  addChildToPerson(child: Child, personId: string): Result<void>;
  removeChildFromPerson(childId: string, personId: string): Result<void>;
}
