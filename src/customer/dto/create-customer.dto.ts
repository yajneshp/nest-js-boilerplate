import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomer {
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  middleName = '';

  organization = 1;

  createdBy = 1;

  updatedBy = 1;
}
