import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateCustomer } from 'src/customer/dto/create-customer.dto';
import { UpdateCustomer } from 'src/customer/dto/update-customer.dto';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;
  let customerData: CreateCustomer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /customer', async () => {
    const customer = {
      firstName: 'Test FName',
      lastName: 'Test LName',
    };
    return await request(app.getHttpServer())
      .post('/customer')
      .send(customer as CreateCustomer)
      .expect(201)
      .then(({ body }) => {
        customerData = body;
      });
  });

  it('GET /customer/{id}', () => {
    return request(app.getHttpServer())
      .get('/customer/' + customerData.id)
      .expect(200)
      .then(({ body }) => {
        expect(body.created).toBeDefined();
        expect(body.updated).toBeDefined();
        // delete the created and updated keys as they cannot be validated
        delete body.created;
        delete body.updated;
        expect(body).toEqual(customerData);
      });
  });

  it('GET /customer', () => {
    return request(app.getHttpServer())
      .get('/customer')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('PATCH /customer/{id}', () => {
    const customer = {
      firstName: 'Test FName Updated',
    };
    customerData.firstName = customer.firstName;
    return request(app.getHttpServer())
      .patch('/customer/' + customerData.id)
      .send(customer as UpdateCustomer)
      .expect(200)
      .then(({ body }) => {
        expect(body.created).toBeDefined();
        expect(body.updated).toBeDefined();
        // delete the created and updated keys as they cannot be validated
        delete body.created;
        delete body.updated;
        expect(body).toEqual(customerData);
      });
  });

  it('DELETE /customer/{id}', () => {
    return request(app.getHttpServer())
      .delete('/customer/' + customerData.id)
      .expect(200);
  });
});
