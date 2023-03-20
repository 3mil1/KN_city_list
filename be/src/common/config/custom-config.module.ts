import { join } from 'path';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { CustomConfigService } from '@app/common/config/custom-config.service';
import { validate } from '@app/common/config/env.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) =>
        ({
          logging: false,
          entities: [join(__dirname, '..', '..', '**', '*.entity{.ts,.js}')],
          migrations: [
            join(
              __dirname,
              '..',
              '..',
              '..',
              'database',
              'migrations',
              '**',
              '*{.ts,.js}',
            ),
          ],
          migrationsRun: true,
          migrationsTableName: 'migrations',
          keepConnectionAlive: true,
          synchronize: true,
          type: 'postgres',
          host: configService.DATABASE_HOSTNAME,
          port: configService.DATABASE_PORT,
          username: configService.DATABASE_USERNAME,
          password: configService.DATABASE_PASSWORD,
          database: configService.DATABASE_NAME,
        } as PostgresConnectionOptions),
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
