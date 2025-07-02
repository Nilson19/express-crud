import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
};
