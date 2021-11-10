import { BaseError } from './base-error';

export class UnexpectedError extends BaseError {
  constructor(message: string) {
    super({ name: 'unexpected-error', message });
  }
}
