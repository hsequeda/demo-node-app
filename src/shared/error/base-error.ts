import { IResultError } from 'fpts-monads';

type BaseErrorProps = {
  name: string;
  message: string;
};

export abstract class BaseError extends Error implements IResultError {
  constructor({ name, message }: BaseErrorProps) {
    super(message);
    Object.defineProperty(this, 'name', { value: name });
  }

  pretty(): string {
    return `[${this.name}]: ${this.message}`;
  }

  throw(): void {
    throw this;
  }
}
