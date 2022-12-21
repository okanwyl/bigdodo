import path from 'path';
import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'database',
  (): PostgresConnectionOptions =>
    ({
      logging: false,
      entities: [path.resolve(`${__dirname}/../../**/**.entity{.ts,.js}`)],
      migrations: [
        path.resolve(`${__dirname}/../../../database/migrations/*{.ts,.js}`),
      ],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      keepConnectionAlive: true,
      synchronize: false,
      type: 'postgres',
      host: process.env.DATABASE_HOSTNAME,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    } as PostgresConnectionOptions),
);
