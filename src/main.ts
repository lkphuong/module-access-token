import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TokenMiddleware } from './common/middlewares/token.middleware';
import { AppConfigService } from './config/app/app.service';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfig: AppConfigService = await app.get(AppConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(TokenMiddleware);
  await app.listen(appConfig.port);
}
bootstrap();
