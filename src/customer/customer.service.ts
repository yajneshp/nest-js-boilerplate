import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
import { UpdateCustomer } from './dto/update-customer.dto';
import { Customer_T } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer_T)
    private customerRepository: Repository<Customer_T>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create(createCustomer: CreateCustomerRequest) {
    return await this.customerRepository.save(createCustomer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    return await this.customerRepository.findOneBy({ id: id });
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
