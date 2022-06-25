import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmConfigService } from './database/database.postgresql';
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ databaseConfig ],
      envFilePath: ['.env']
    }), 
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),   
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RequestLoggerMiddleware)
    .forRoutes('customer');
  }
}