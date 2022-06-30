import { Expose } from 'class-transformer';

export class Customer {
  @Expose({ name: 'firstName' })
  first_name: string;

  @Expose({ name: 'lastName' })
  last_name: string;

  @Expose({ name: 'middleName' })
  middle_name: string;

  @Expose()
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
