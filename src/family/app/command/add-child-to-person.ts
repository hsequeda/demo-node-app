import { IPersonRepository } from 'src/family/domaim/person.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Result } from 'fpts-monads';
import { Child } from 'src/family/domaim/child';

/**
 * Add a new child to the person that match with the passed 'personId'
 *
 * @export
 * @class AddChildToPersonCommand
 */
export class AddChildToPersonCommand {
  constructor(
    public id: string,
    public name: string,
    public personId: string,
  ) {}
}

@CommandHandler(AddChildToPersonCommand)
export class AddChildToPersonHandler
  implements ICommandHandler<AddChildToPersonCommand> {
  constructor(private repository: IPersonRepository) {}

  async execute(cmd: AddChildToPersonCommand): Promise<Result<void>> {
    const childOrErr = Child.New(cmd.id, cmd.name);

    if (childOrErr.isFailure) {
      return Result.Fail(childOrErr.unwrapError());
    }

    const child = childOrErr.unwrap();
    return this.repository.addChildToPerson(child, cmd.personId);
  }
}
