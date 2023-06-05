import { join, resolve } from 'path';
import { Dialect } from 'sequelize/types';
import { config as configDotenv } from 'dotenv';

export const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Load .env file
if (ENVIRONMENT !== 'production') {
  configDotenv();
}

// Configuration
export const server = {
  host: process.env.SERVER_IP,
  port: parseInt(process.env.SERVER_PORT),
  frontendUrl: process.env.FRONTEND_URL,
};

export const paths = {
  root: process.env.NODE_PATH || resolve('.'),
  migrations: process.env.MIGRATIONS_PATH,
  seeders: process.env.SEEDERS_PATH,
  models: process.env.MODEL_PATH,
};

export const database = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT as Dialect,
  modelPaths: [join(__dirname || '', process.env.MODEL_PATH || '')],
  sync: {
    force: `${process.env.DB_SYNC_FORCE}` == 'true',
  },
};
