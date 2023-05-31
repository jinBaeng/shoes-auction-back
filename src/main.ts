import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public/img'), {
    prefix: '/public/img',
    index: false,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(multer().single('file'));
  await app.listen(process.env.PORT || 8001);
}
bootstrap();
