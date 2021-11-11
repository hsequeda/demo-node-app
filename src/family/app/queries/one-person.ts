import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

export class OnePersonQuery {
  constructor(public readonly personId: string) {}
}

export type ChildDto = {
  id: string;
  name: string;
};

export type PersonDto = {
  id: string;
  name: string;
  lastname: string;
  gender: string;
  married: boolean;
  age: number;
  children: ChildDto[];
};

export interface IOnePersonReadModel {
  onePerson(personId: string): Promise<PersonDto>;
}

@QueryHandler(OnePersonQuery)
export class OnePersonHandler implements IQueryHandler<OnePersonQuery> {
  constructor(
    @Inject('IOnePersonReadModel')
    private readonly _onePersonReadModel: IOnePersonReadModel,
  ) {}
  execute(query: OnePersonQuery): Promise<PersonDto> {
    return this._onePersonReadModel.onePerson(query.personId);
  }
}
