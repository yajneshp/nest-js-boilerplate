import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerRequest } from './create-customer-request.dto';

export class UpdateCustomer extends PartialType(CreateCustomerRequest) {}
