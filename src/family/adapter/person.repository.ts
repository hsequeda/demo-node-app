import { Injectable } from '@nestjs/common';
import { PersonEntity } from './person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPersonRepository } from '../domaim/person.repository';
import { IAllPersonReadModel, PersonDto } from '../app/queries/all-persons';
import {
  IOnePersonReadModel,
  PersonDto as OnePersonDto,
} from '../app/queries/one-person';
import { Person } from '../domaim/person';
import { Result, IResultError } from 'fpts-monads';
import { Child } from '../domaim/child';
import { Repository } from 'typeorm';
import { ChildEntity } from './child.entity';
import { UnexpectedError } from 'src/shared/error/unexpected-error';
import { PersonGenderFromString } from '../domaim/personal-gender';

@Injectable()
export class PersonRepository
  implements IPersonRepository, IAllPersonReadModel, IOnePersonReadModel {
  constructor(
    @InjectRepository(PersonEntity)
    private _personRepository: Repository<PersonEntity>,
    @InjectRepository(ChildEntity)
    private _childRepository: Repository<ChildEntity>,
  ) {}

  async save(newPerson: Person): Promise<Result<void, IResultError>> {
    try {
      await this._personRepository.save({
        id: newPerson.id,
        name: newPerson.name,
        lastname: newPerson.lastname,
        gender: newPerson.gender,
        married: newPerson.married,
        age: newPerson.age,
      });
    } catch (err) {
      return Result.Fail<void>(new UnexpectedError(err.message));
    }

    return Result.Ok<void>();
  }

  async getOne(personId: string): Promise<Result<Person, IResultError>> {
    try {
      const personModel = await this._personRepository.findOne(personId);
      const personGender = PersonGenderFromString(personModel.gender);
      return Person.New(
        personModel.id,
        personModel.name,
        personModel.lastname,
        personGender,
        personModel.married,
        personModel.age,
      );
    } catch (err) {
      return Result.Fail<Person>(new UnexpectedError(err.message));
    }
  }

  async remove(personId: string): Promise<Result<void, IResultError>> {
    try {
      await this._childRepository.delete({ father: { id: personId } });
      await this._personRepository.delete({ id: personId });
    } catch (err) {
      return Result.Fail<void>(new UnexpectedError(err.message));
    }
  }

  async addChildToPerson(
    child: Child,
    personId: string,
  ): Promise<Result<void, IResultError>> {
    try {
      await this._childRepository.save({
        id: child.id,
        name: child.name,
        father: { id: personId },
      });
    } catch (err) {
      return Result.Fail<void>(new UnexpectedError(err.message));
    }
  }

  async removeChildFromPerson(
    childId: string,
    personId: string,
  ): Promise<Result<void, IResultError>> {
    try {
      await this._childRepository.delete({
        id: childId,
        father: { id: personId },
      });
    } catch (err) {
      return Result.Fail<void>(new UnexpectedError(err.message));
    }
  }

  async allPersons(): Promise<PersonDto[]> {
    try {
      const personModels = await this._personRepository.find({
        loadEagerRelations: true,
      });
      return personModels.map(personModel => {
        return {
          id: personModel.id,
          name: personModel.name,
          lastname: personModel.lastname,
          gender: personModel.gender,
          married: personModel.married,
          age: personModel.age,
          childNumber: personModel.chidren.length,
        } as PersonDto;
      });
    } catch (err) {
      return [];
    }
  }

  async onePerson(personId: string): Promise<OnePersonDto> {
    const resp: OnePersonDto = {} as OnePersonDto;
    try {
      const personModel = await this._personRepository.findOne(personId, {
        loadEagerRelations: true,
      });

      resp.id = personModel.id;
      resp.name = personModel.name;
      resp.lastname = personModel.lastname;
      resp.gender = personModel.gender;
      resp.age = personModel.age;
      resp.married = personModel.married;
      for (const child of personModel.chidren) {
        resp.children.push({ id: child.id, name: child.name });
      }

      return resp;
    } catch (err) {
      return {} as OnePersonDto;
    }
  }
}
