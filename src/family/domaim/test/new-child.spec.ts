import { Child } from '../child';

describe('New child Test', () => {
  it('Ok case', () => {
    const childOrErr = Child.New(
      '1',
      'William (but with a length greater that 20)',
    );

    expect(childOrErr.isSuccess).toBeTruthy();
    expect(childOrErr.unwrap()).toEqual({
      id: '1',
      name: 'William (but with a length greater that 20)',
    });
  });

  it('Error: Name too long', () => {
    const childOrErr = Child.New(
      '1',
      'A name to much longer, A name to much longer, A name to much longer, A name to much longer, A name to much longer, A name to much longer, A name to much longer',
    );

    expect(childOrErr.isSuccess).toBeFalsy();
  });

  it('Error: Id required', () => {
    const childOrErr = Child.New(null, 'William');
    expect(childOrErr.isSuccess).toBeFalsy();
  });
});
