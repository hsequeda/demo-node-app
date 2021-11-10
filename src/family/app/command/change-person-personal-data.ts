import { IPersonRepository } from 'src/family/domaim/person.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Result } from 'fpts-monads';
import { Person } from 'src/family/domaim/person';
import { PersonGenderFromString } from 'src/family/domaim/personal-gender';

/**
 * Change the personal data of a person
 *
 * @export
 * @class ChangePersonPersonalDataCommand
 */
export class ChangePersonPersonalDataCommand {
  constructor(
    public personId: string,
    public name?: string,
    public lastname?: string,
    public gender?: string,
    public married?: boolean,
    public age?: number,
  ) {}
}

@CommandHandler(ChangePersonPersonalDataCommand)
export class ChangePersonPersonalDataHandler
  implements ICommandHandler<ChangePersonPersonalDataCommand> {
  constructor(private repository: IPersonRepository) {}

  async execute(cmd: ChangePersonPersonalDataCommand): Promise<Result<void>> {
    const personOrErr = this.repository.getOne(cmd.personId);
    if (personOrErr.isFailure) {
      return Result.Fail(personOrErr.unwrapError());
    }

    const person = personOrErr.unwrap();
    const personGender = cmd.gender
      ? PersonGenderFromString(cmd.gender)
      : person.gender;
    const updatedPersonOrErr = Person.New(
      person.id,
      cmd.name ?? person.name,
      cmd.lastname ?? person.lastname,
      personGender,
      cmd.married ?? person.married,
      cmd.age ?? person.age,
    );

    if (updatedPersonOrErr.isFailure) {
      return Result.Fail(personOrErr.unwrapError());
    }

    return this.repository.save(person);
  }
}
