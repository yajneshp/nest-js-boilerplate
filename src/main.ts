import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Customer')
    .setDescription('Customer Managment API')
    .setVersion('1.0')
    .addTag('customer')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/swagger/api', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
