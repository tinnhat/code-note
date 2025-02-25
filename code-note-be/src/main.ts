import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //validation tránh các value không define được gửi kèm
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Code note')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*', // Chỉ cho phép nguồn này
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Phương thức được phép
    allowedHeaders: 'Content-Type, Accept', // Header được phép
    credentials: true, // Cho phép gửi cookie hoặc thông tin xác thực
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
