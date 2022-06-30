import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer_T } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer_T])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
