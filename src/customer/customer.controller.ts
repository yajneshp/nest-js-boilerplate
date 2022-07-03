import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomerService } from './customer.service';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
import { CreateCustomerResponse } from './dto/create-customer-response.dto';
import { RecordRowId } from './dto/record-row-id';
import { UpdateCustomer } from './dto/update-customer.dto';

@Controller('customer')
@ApiTags('customer')
@ApiHeader({
  name: 'correlationId',
  description: 'Correlation Id to be passed (uuid)',
  required: true,
  example: '13sdgh23-sdf12hwefd3-43dsdf-addsdf',
  allowEmptyValue: false,
})
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({
    description: 'Customer',
    type: CreateCustomerRequest,
  })
  @ApiResponse({ status: 200, description: 'Ok', type: CreateCustomerResponse })
  create(@Body() createCustomerDto: CreateCustomerRequest) {
    return this.customerService.create(
      plainToInstance(CreateCustomerRequest, createCustomerDto),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [CreateCustomerResponse],
  })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: CreateCustomerResponse,
  })
  async findOne(
    @Param() { id }: RecordRowId,
    @Res() res,
    @Req() req,
  ): Promise<any> {
    return res
      .set({ correlationId: req.headers['correlationid'] })
      .json(await this.customerService.findOne(+id));
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ok', type: CreateCustomerResponse })
  update(
    @Param() { id }: RecordRowId,
    @Body() updateCustomerDto: UpdateCustomer,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(
    @Param()
    { id }: RecordRowId,
  ) {
    return this.customerService.remove(+id);
  }
}
