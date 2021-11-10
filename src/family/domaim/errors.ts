import { BaseError } from 'src/shared/error/base-error';

export class UnableToCreateNewPersonError extends BaseError {
  constructor(message: string) {
    super({ name: 'unable-to-create-new-person', message });
  }
}

export class UnableToAddChildToPerson extends BaseError {
  constructor(message: string) {
    super({ name: 'unable-to-add-child-to-person', message });
  }
}
