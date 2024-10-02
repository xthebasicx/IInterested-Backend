import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('IInterested API')
    .setDescription('note everything you are interested in')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const app_port = 3000;
  await app.listen(app_port);

  Logger.log(`Server Start on http://localhost:${app_port}`);
  Logger.log(`Swagger Start on http://localhost:${app_port}/swagger`);
}
bootstrap();
