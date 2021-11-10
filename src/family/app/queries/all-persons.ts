import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

/**
 * Return a list of person with its number of children
 *
 * @export
 * @class AllPersonQuery
 */
export class AllPersonQuery {}

export type PersonDto = {
  id: string;
  name: string;
  lastname: string;
  gender: string;
  married: boolean;
  age: number;
  childNumber: number;
};

export interface IAllPersonReadModel {
  allPersons(): Promise<PersonDto[]>;
}

@QueryHandler(AllPersonQuery)
class AllPersonHandler implements IQueryHandler<AllPersonQuery> {
  constructor(private readonly _allPersonReadModel: IAllPersonReadModel) {}
  execute(_: AllPersonQuery): Promise<PersonDto[]> {
    return this._allPersonReadModel.allPersons();
  }
}
