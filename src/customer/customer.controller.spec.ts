import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomer } from './dto/create-customer.dto';
import { UpdateCustomer } from './dto/update-customer.dto';

const customerArray = [
  {
    id: 38,
    firstName: ' FName 2',
    lastName: 'LName 2',
    middleName: '',
    organization: 1,
    createdBy: 1,
    updatedBy: 1,
    created: '2022-06-26T19:56:01.283Z',
    updated: '2022-06-26T19:56:01.283Z',
  },
  {
    id: 39,
    firstName: ' FName 32',
    lastName: 'LName 32',
    middleName: '',
    organization: 1,
    createdBy: 1,
    updatedBy: 1,
    created: '2022-06-26T19:56:11.856Z',
    updated: '2022-06-26T19:56:11.856Z',
  },
];

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: CustomerService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(customerArray),
            create: jest.fn().mockResolvedValue(customerArray[0]),
            findOne: jest.fn().mockResolvedValue(customerArray[0]),
            update: jest.fn().mockResolvedValue(customerArray[0]),
            remove: jest.fn().mockReturnValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create customer', async () => {
    const createCustomerDto = plainToInstance(CreateCustomer, {
      firstName: ' FName 2',
      lastName: 'LName 2',
    });
    const customer = await controller.create(createCustomerDto);
    expect(customer).toEqual(customerArray[0]);
  });

  it('should get customer by Id', async () => {
    const customer = await controller.findOne(38);
    expect(customer).toEqual(customerArray[0]);
  });

  it('should get all customers', async () => {
    const customers = await controller.findAll();
    expect(customers).toEqual(customerArray);
  });

  it('should update customer', async () => {
    const updateCustomerDto = plainToInstance(UpdateCustomer, {
      firstName: ' FName 2',
      lastName: 'LName 2',
    });
    const customer = await controller.update(38, updateCustomerDto);
    expect(customer).toEqual(customerArray[0]);
  });

  it('should delete customer', async () => {
    const result = await controller.remove(38);
    expect(result).toBeNull();
  });
});
