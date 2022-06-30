import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CustomerService } from './customer.service';
import { CreateCustomer } from './dto/create-customer.dto';
import { UpdateCustomer } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomer) {
    return this.customerService.create(
      plainToInstance(CreateCustomer, createCustomerDto),
    );
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomer) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerService.remove(+id);
  }
}
