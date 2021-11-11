import { IPersonRepository } from 'src/family/domaim/person.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Result } from 'fpts-monads';
import { Person } from 'src/family/domaim/person';
import { PersonGenderFromString } from 'src/family/domaim/personal-gender';
import { Inject } from '@nestjs/common';

/**
 * Add a new person person if it's valid
 *
 * @export
 * @class AddPersonCommand
 */
export class AddPersonCommand {
  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public gender: string,
    public married: boolean,
    public age: number,
  ) {}
}

@CommandHandler(AddPersonCommand)
export class AddPersonHandler implements ICommandHandler<AddPersonCommand> {
  constructor(
    @Inject('IPersonRepository')
    private repository: IPersonRepository,
  ) {}

  async execute(cmd: AddPersonCommand): Promise<Result<void>> {
    const personGender = PersonGenderFromString(cmd.gender);
    const personOrErr = Person.New(
      cmd.id,
      cmd.name,
      cmd.lastname,
      personGender,
      cmd.married,
      cmd.age,
    );

    if (personOrErr.isFailure) {
      return Result.Fail(personOrErr.unwrapError());
    }

    const person = personOrErr.unwrap();
    return this.repository.save(person);
  }
}
