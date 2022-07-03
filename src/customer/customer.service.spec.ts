import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { WinstonModule } from 'nest-winston';
import { Repository } from 'typeorm';
import { format, transports } from 'winston';
import { CustomerService } from './customer.service';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
import { Customer_T } from './entities/customer.entity';

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

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer_T>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          provide: getRepositoryToken(Customer_T),
          useValue: {
            find: jest.fn().mockResolvedValue(customerArray),
            findOneBy: jest.fn().mockResolvedValue(customerArray[0]),
            update: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue(customerArray[0]),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer_T>>(
      getRepositoryToken(Customer_T),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should retuen an array of all customers', async () => {
      const customers = await service.findAll();
      expect(customers).toEqual(customerArray);
    });
  });

  describe('findOne()', () => {
    it('should find specific customer', async () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      const customer = await service.findOne(38);
      expect(customer).toEqual(customerArray[0]);
      expect(repoSpy).toBeCalledWith({ id: 38 });
    });
  });

  describe('create()', () => {
    it('should create customer', async () => {
      const createCustomer = plainToInstance(CreateCustomerRequest, {
        firstName: ' FName 2',
        lastName: 'LName 2',
      });
      const repoSpy = jest.spyOn(repository, 'save');
      const customer = await service.create(createCustomer);
      expect(customer).toEqual(customerArray[0]);
      expect(repoSpy).toBeCalledWith(createCustomer);
    });
  });

  describe('update()', () => {
    it('should find and update specific customer', async () => {
      const updateCustomer = {
        firstName: 'FName Update',
        lastName: 'LName Update',
      };
      const repoSpy = jest.spyOn(repository, 'update');
      const customer = await service.update(38, updateCustomer);
      const expectedResult = customerArray[0];
      expectedResult.firstName = updateCustomer.firstName;
      expectedResult.lastName = updateCustomer.lastName;
      expect(customer).toEqual(expectedResult);
      expect(repoSpy).toBeCalledWith({ id: 38 }, updateCustomer);
      expect(repoSpy).toBeCalledTimes(1);
    });
  });

  describe('remove()', () => {
    it('should remove a customer', async () => {
      const customerDeleted = await service.remove(38);
      expect(customerDeleted).toEqual({ affected: 1 });
    });
  });
});
