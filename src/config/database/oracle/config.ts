import { registerAs } from '@nestjs/config';

export default registerAs('oracle', () => ({
    name: 'erp',
    type: 'oracle',
    host: process.env.ORACLE_DB_HOST,
    port: +process.env.ORACLE_DB_PORT,
    username: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    // database: process.env.ORACLE_DB_SCHEMA,
    sid: process.env.ORACLE_DB_SID,
    // entities: [process.env.MYSQL_ENTITY_PATH],
  }));