import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
  DB_HOST: process.env.DB_HOST || 'mongodb://localhost:27017/specie',
  PORT: process.env.PORT || 3013,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET:  process.env.REFRESH_TOKEN_SECRET,
};
