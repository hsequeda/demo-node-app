import { IPersonRepository } from 'src/family/domaim/person.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Result } from 'fpts-monads';
import { Inject } from '@nestjs/common';

/**
 * Remove a person with that match with the passed 'personId'
 *
 * @export
 * @class DeletePersonCommand
 */
export class DeletePersonCommand {
  constructor(public personId: string) {}
}

@CommandHandler(DeletePersonCommand)
export class DeletePersonHandler
  implements ICommandHandler<DeletePersonCommand> {
  constructor(
    @Inject('IPersonRepository')
    private repository: IPersonRepository,
  ) {}

  async execute(cmd: DeletePersonCommand): Promise<Result<void>> {
    return this.repository.remove(cmd.personId);
  }
}
