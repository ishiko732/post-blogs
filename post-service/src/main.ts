import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('PORT') || 3000;
  loadSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}

function loadSwagger(app: INestApplication<any>) {
  const options = new DocumentBuilder()
    .setTitle('Posts example')
    .setDescription('The posts API description')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
