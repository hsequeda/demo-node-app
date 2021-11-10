import { Result } from 'fpts-monads';
import { Person } from './person';
import { Child } from './child';

export interface IPersonRepository {
  save(newPerson: Person): Promise<Result<void>>;
  getOne(personId: string): Promise<Result<Person>>;
  remove(personId: string): Promise<Result<void>>;
  addChildToPerson(child: Child, personId: string): Promise<Result<void>>;
  removeChildFromPerson(
    childId: string,
    personId: string,
  ): Promise<Result<void>>;
}
