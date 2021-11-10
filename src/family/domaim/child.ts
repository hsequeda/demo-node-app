import { Result } from 'fpts-monads';
import { UnableToAddChildToPerson } from './errors';

export class Child {
  constructor(public id: string, public name: string) {}

  /**
   * New is a static factory to create a new valid Child
   *
   * @static
   * @param {string} id
   * @param {string} name
   * @returns  {Result<Child>}
   * @memberof Child
   */
  public static New(id: string, name: string): Result<Child> {
    if (!id) {
      return Result.Fail(new UnableToAddChildToPerson('child id is empty'));
    }

    if (!name || name.length < 20 || name.length > 150) {
      return Result.Fail(new UnableToAddChildToPerson('child name is invalid'));
    }

    return Result.Ok(new Child(id, name));
  }
}
