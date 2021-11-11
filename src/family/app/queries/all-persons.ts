import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

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
export class AllPersonHandler implements IQueryHandler<AllPersonQuery> {
  constructor(
    @Inject('IAllPersonReadModel')
    private readonly _allPersonReadModel: IAllPersonReadModel,
  ) {}
  async execute(_: AllPersonQuery): Promise<PersonDto[]> {
    return this._allPersonReadModel.allPersons();
  }
}
