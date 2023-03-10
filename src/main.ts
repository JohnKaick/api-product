import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './docs/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Vars amb
  const configService = app.get(ConfigService);

  // Dto validation - class validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  await SwaggerService.generate(app, configService);

  const port = configService.get('PORT');

  await app.listen(port || 3000);
}
bootstrap();
