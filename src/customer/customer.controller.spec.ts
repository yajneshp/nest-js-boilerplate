import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
import { UpdateCustomer } from './dto/update-customer.dto';
import { createRequest, createResponse } from 'node-mocks-http';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

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
      imports: [
        WinstonModule.forRoot({
          format: format.combine(
            format.json(),
            format.prettyPrint(),
            format.timestamp(),
            format.splat(),
          ),
          transports: [new transports.Console()],
        }),
      ],
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
    const createCustomerDto = plainToInstance(CreateCustomerRequest, {
      firstName: ' FName 2',
      lastName: 'LName 2',
    });
    const customer = await controller.create(createCustomerDto);
    expect(customer).toEqual(customerArray[0]);
  });

  it('should get customer by Id', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/customer/38',
      params: { id: 38 },
      headers: { correlationid: 'asdf--123-dfdf' },
    });
    const res = createResponse();
    await controller.findOne({ id: 38 }, res, req);
    expect(res._getJSONData()).toEqual(customerArray[0]);
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
    const customer = await controller.update({ id: 38 }, updateCustomerDto);
    expect(customer).toEqual(customerArray[0]);
  });

  it('should delete customer', async () => {
    const result = await controller.remove({ id: 38 });
    expect(result).toBeNull();
  });
});
