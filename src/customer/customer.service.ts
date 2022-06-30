import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomer } from './dto/create-customer.dto';
import { UpdateCustomer } from './dto/update-customer.dto';
import { Customer_T } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer_T)
    private customerRepository: Repository<Customer_T>,
  ) {}

  async create(createCustomer: CreateCustomer) {
    return await this.customerRepository.save(createCustomer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCustomerDto: UpdateCustomer) {
    await this.customerRepository
      .update({ id: id }, updateCustomerDto)
      .then((e) => console.log(e));
    return this.customerRepository.findOneBy({ id: id });
  }

  remove(id: number) {
    return this.customerRepository.delete(id);
  }
}
