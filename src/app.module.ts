import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import databaseConfig from './config/database.config';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmConfigService } from './database/database.postgresql';
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware';
import { SetCorrelationId } from './middlewares/set.correlationid.middleware';

@Module({
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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    CustomerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetCorrelationId, RequestLoggerMiddleware)
      .forRoutes('customer');
  }
}
