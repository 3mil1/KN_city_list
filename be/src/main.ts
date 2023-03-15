import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/modules/app/app.module';
import { CustomConfigService } from '@app/common/config/custom-config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { loggerConfig } from '@app/common/config/logger';
import { Logger } from '@nestjs/common';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });
  const logger = Logger;

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(CustomConfigService);
  app.setGlobalPrefix('api');
  await app.listen(configService.PORT).then(() => {
    logger.log(`Server is running on port ${configService.PORT}`);
  });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
