import 'dotenv/config';
import * as path from 'path';
import { DataSource } from 'typeorm';

const config = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOSTNAME,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [path.join(__dirname, '../../', '/**/*.entity{.ts,.js}')],
  migrations: [
    path.join(__dirname, '../../../', 'database/seeders/*{.ts,.js}'),
  ],
  migrationsTableName: 'seeders',
  logging: true,
  synchronize: false,
});

export default config;