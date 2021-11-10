import { IPersonRepository } from 'src/family/domaim/person.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Result } from 'fpts-monads';

/**
 * Remove a child of a person by the childId and the personId
 *
 * @export
 * @class RemoveChildFromPersonCommand
 */
export class RemoveChildFromPersonCommand {
  constructor(public childId: string, public personId: string) {}
}

@CommandHandler(RemoveChildFromPersonCommand)
export class RemoveChildFromPersonHandler
  implements ICommandHandler<RemoveChildFromPersonCommand> {
  constructor(private repository: IPersonRepository) {}

  async execute(cmd: RemoveChildFromPersonCommand): Promise<Result<void>> {
    return this.repository.removeChildFromPerson(cmd.childId, cmd.personId);
  }
}
