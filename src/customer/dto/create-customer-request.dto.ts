import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CreateCustomerRequest {
  @IsNumberString()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  middleName: string;

  organization = 1;

  createdBy = 1;

  updatedBy = 1;
}
