import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Rest Gestión de Programas de Postgrado USFX')
    .setDescription(
      'API Rest para la gestión de programas de postgrado de la USFX',
    )
    .setVersion('1.0')
    .addTag('niveles-academicos')
    .addTag('programas')
    .build();

  // ✅ forma correcta en Swagger v7+
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App corriendo en ${await app.getUrl()}/apidoc`);
}

bootstrap();
