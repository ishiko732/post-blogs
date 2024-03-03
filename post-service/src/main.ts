import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  loadSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3004);
}

function loadSwagger(app: INestApplication<any>) {
  const options = new DocumentBuilder()
    .setTitle('Posts example')
    .setDescription('The posts API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
