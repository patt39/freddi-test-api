import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { config } from './app/config';

async function bootstrap() {
  // config.update({});
  const port = config.port;
  const version = config.api.version;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`/api/${version}`);
  const withList = config.url.allowedOrigins?.split(',') || [
    'http://localhost:3000',
  ];
  app.enableCors({
    origin: withList,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  // app.use(useragent.express());
  await app.listen(port, () => {
    console.log(`=============================================`);
    console.log(`*** 🚀 Link  http://localhost:${port}/api/${version} ***`);
    console.log(`=============================================`);
  });
}
bootstrap();
