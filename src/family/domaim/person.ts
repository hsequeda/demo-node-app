import { Result } from 'fpts-monads';
import {
  UnableToCreateNewPersonError,
  UnableToAddChildToPerson,
} from './errors';
import { PersonGender } from './personal-gender';

export class Person {
  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public gender: PersonGender,
    public married: boolean,
    public age: number,
  ) {}

  /**
   * New is a static factory to create a new valid Person
   *
   * @static
   * @param {string} id
   * @param {string} name
   * @param {string} lastname
   * @param {PersonGender} gender
   * @param {boolean} [married=false]
   * @param {number} [age]
   * @returns  {Result<Person>}
   * @memberof Person
   */
  static New(
    id: string,
    name: string,
    lastname: string,
    gender: PersonGender,
    married: boolean = false,
    age?: number,
  ): Result<Person> {
    if (!id) {
      return Result.Fail(new UnableToCreateNewPersonError('id is empty'));
    }

    console.log(name.length);
    if (!name || name.length < 20 || name.length > 150) {
      return Result.Fail(new UnableToCreateNewPersonError('invalid name'));
    }

    if (!lastname || lastname.length > 150) {
      return Result.Fail(new UnableToCreateNewPersonError('invalid lastname'));
    }

    if (!age) {
      age = 0;
    }

    return Result.Ok(new Person(id, name, lastname, gender, married, age));
  }
}
