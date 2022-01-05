import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
    name: 'apix',
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: +process.env.MYSQL_DB_PORT,
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_SCHEMA,
    // entities: [process.env.MYSQL_ENTITY_PATH],
  }));