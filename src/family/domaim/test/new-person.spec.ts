import { Person } from '../person';
import { PersonGender } from '../personal-gender';

describe('New person Test', () => {
  it('Ok case', () => {
    const personOrErr = Person.New(
      '1',
      'William (but with a length greater that 20)',
      'Tell',
      PersonGender.Male,
      false,
      23,
    );

    expect(personOrErr.isSuccess).toBeTruthy();
    expect(personOrErr.unwrap()).toEqual({
      id: '1',
      name: 'William (but with a length greater that 20)',
      lastname: 'Tell',
      gender: PersonGender.Male,
      married: false,
      age: 23,
    });
  });

  it('Error: LastName too long', () => {
    const personOrErr = Person.New(
      '1',
      'William (but with a length greater that 20)',
      'A lastname to much longer, A lastname to much longer, A lastname to much longer, A lastname to much longer, A lastname to much longer, A lastname to much longer',
      PersonGender.Male,
      false,
      23,
    );

    expect(personOrErr.isSuccess).toBeFalsy();
  });

  it('Error: Name too long', () => {
    const personOrErr = Person.New(
      '1',
      'A name to much longer, A name to much longer, A name to much longer, A name to much longer, A name to much longer, A name to much longer, A name to much longer',
      'Tell',
      PersonGender.Male,
      false,
      23,
    );

    expect(personOrErr.isSuccess).toBeFalsy();
  });

  it('Error: Id required', () => {
    const personOrErr = Person.New(
      null,
      'William',
      'Tell',
      PersonGender.Male,
      false,
      23,
    );

    expect(personOrErr.isSuccess).toBeFalsy();
  });
});
