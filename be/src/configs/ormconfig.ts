import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [path.join(__dirname, '../', '/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../', '/migrations/**/*{.ts,.js}')],
  synchronize: false,
};

export default config;
