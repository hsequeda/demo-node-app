import { Test, TestingModule } from '@nestjs/testing';
import { FamilyModule } from '../family.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { Person } from '../domaim/person';
import { PersonGender } from '../domaim/personal-gender';
import { Child } from '../domaim/child';

describe('PersonRepository Integration test', () => {
  let app: INestApplication;
  let repository: PersonRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        FamilyModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: parseInt(process.env.DB_PORT),
          entities: ['./**/adapter/*.entity.ts'],
          synchronize: false,
        }),
      ],
    }).compile();
    module.useLogger(['warn', 'error']);
    app = module.createNestApplication();
    repository = module.get(PersonRepository);
    await app.init();
  });

  afterEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Save person', async () => {
    const person = getValidDomainPerson();
    let okOrErr = await repository.save(person);
    expect(okOrErr.isSuccess).toBeTruthy();
    const retrivedPersonOrErr = await repository.getOne(person.id);
    expect(retrivedPersonOrErr.isSuccess).toBeTruthy();
    expect(retrivedPersonOrErr.unwrap()).toEqual(person);
    const updatedPerson = person;
    updatedPerson.name = 'Federico (with al long name)';
    okOrErr = await repository.save(updatedPerson);
    expect(okOrErr.isSuccess).toBeTruthy();
    const retrivedUpdatedPersonOrErr = await repository.getOne(person.id);
    expect(retrivedUpdatedPersonOrErr.isSuccess).toBeTruthy();
    expect(retrivedUpdatedPersonOrErr.unwrap()).toEqual(updatedPerson);
  });

  it('Add child to person', async () => {
    const validPerson = getValidDomainPerson();
    let okOrErr = await repository.save(validPerson);
    expect(okOrErr.isSuccess).toBeTruthy();

    okOrErr = await repository.addChildToPerson(
      getValidDomainChild(),
      validPerson.id,
    );
    expect(okOrErr.isSuccess).toBeTruthy();
  });

  it('GetOnePerson (Domain version)', async () => {
    const validPerson = getValidDomainPerson();
    let okOrErr = await repository.save(validPerson);
    expect(okOrErr.isSuccess).toBeTruthy();
    let retrivedPersonOrErr = await repository.getOne(validPerson.id);
    expect(retrivedPersonOrErr.isSuccess).toBeTruthy();
    expect(retrivedPersonOrErr.unwrap()).toEqual(validPerson);
  });

  it('RemovePerson (with his children)', async () => {
    const validPerson = getValidDomainPerson();
    let okOrErr = await repository.save(validPerson);
    const child = getValidDomainChild();
    okOrErr = await repository.addChildToPerson(child, validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
    child.id = '2';
    child.name = 'Federico ( with a long name )';
    okOrErr = await repository.addChildToPerson(child, validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
    okOrErr = await repository.remove(validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
  });

  it('RemoveChildFromPerson', async () => {
    const validPerson = getValidDomainPerson();
    let okOrErr = await repository.save(validPerson);
    const child = getValidDomainChild();
    okOrErr = await repository.addChildToPerson(child, validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
    child.id = '2';
    child.name = 'Federico ( with a long name )';
    okOrErr = await repository.addChildToPerson(child, validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
    okOrErr = await repository.removeChildFromPerson('1', validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
  });

  it('OnePerson', async () => {
    const noPerson = await repository.onePerson('no person id');
    expect(noPerson).toEqual({});
    const validPerson = getValidDomainPerson();
    let okOrErr = await repository.save(validPerson);
    expect(okOrErr.isSuccess).toBeTruthy();

    const personWithoutChildren = await repository.onePerson(validPerson.id);
    expect(personWithoutChildren).toEqual({
      id: '1',
      name: 'William (with a long name)',
      lastname: 'Tell',
      gender: 'male',
      married: true,
      age: 10,
      children: [],
    });

    const child = getValidDomainChild();
    okOrErr = await repository.addChildToPerson(child, validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();
    child.id = '2';
    child.name = 'Federico ( with a long name )';
    okOrErr = await repository.addChildToPerson(child, validPerson.id);
    expect(okOrErr.isSuccess).toBeTruthy();

    const retrivedPerson = await repository.onePerson(validPerson.id);
    expect(retrivedPerson).toEqual({
      id: '1',
      name: 'William (with a long name)',
      lastname: 'Tell',
      gender: 'male',
      married: true,
      age: 10,
      children: [
        { id: '1', name: 'William Yunior (with a long name)' },
        { id: '2', name: 'Federico ( with a long name )' },
      ],
    });
  });

  it('AllPerson', async () => {
    const zeroPersons = await repository.allPersons();
    expect(zeroPersons).toEqual([]);
    const validPersonWithoutChildren = getValidDomainPerson();
    let okOrErr = await repository.save(validPersonWithoutChildren);
    expect(okOrErr.isSuccess).toBeTruthy();

    const onePersons = await repository.allPersons();
    const persons = [
      {
        id: '1',
        name: 'William (with a long name)',
        lastname: 'Tell',
        gender: 'male',
        married: true,
        age: 10,
        childNumber: 0,
      },
    ];
    expect(onePersons).toEqual(persons);

    const validPersonWithOneChildren = validPersonWithoutChildren;
    validPersonWithOneChildren.id = '2';

    okOrErr = await repository.save(validPersonWithOneChildren);
    const child = getValidDomainChild();
    okOrErr = await repository.addChildToPerson(
      child,
      validPersonWithOneChildren.id,
    );
    expect(okOrErr.isSuccess).toBeTruthy();

    const twoPersons = await repository.allPersons();
    persons.push({
      id: '2',
      name: 'William (with a long name)',
      lastname: 'Tell',
      gender: 'male',
      married: true,
      age: 10,
      childNumber: 1,
    });
    expect(twoPersons).toEqual(persons);
  });
});

function getValidDomainPerson(): Person {
  return new Person(
    '1',
    'William (with a long name)',
    'Tell',
    PersonGender.Male,
    true,
    10,
  );
}

function getValidDomainChild(): Child {
  return new Child('1', 'William Yunior (with a long name)');
}
