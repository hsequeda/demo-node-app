import { IPersonRepository } from 'src/family/domaim/person.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Result } from 'fpts-monads';

/**
 * Remove a child of a person by the childId and the personId
 *
 * @export
 * @class AddChildToPersonCommand
 */
export class AddChildToPersonCommand {
  constructor(public childId: string, public personId: string) {}
}

@CommandHandler(AddChildToPersonCommand)
export class AddChildToPersonHandler
  implements ICommandHandler<AddChildToPersonCommand> {
  constructor(private repository: IPersonRepository) {}

  async execute(cmd: AddChildToPersonCommand): Promise<Result<void>> {
    return this.repository.removeChildFromPerson(cmd.childId, cmd.personId);
  }
}
