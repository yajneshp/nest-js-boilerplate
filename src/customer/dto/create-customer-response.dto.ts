import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: false })
  middleName: string;

  @ApiProperty()
  organization: number;

  @ApiProperty()
  createdBy: number;

  @ApiProperty()
  updatedBy: number;
}
