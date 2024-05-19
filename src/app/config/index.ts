import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  environment: process.env.NODE_ENV || 'dev',

  /**
   * Url site
   */
  url: {
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    client: process.env.NODE_CLIENT_URL,
    dashboard: process.env.NODE_DASHBOARD_URL,
  },

  /**
   * Server port
   */
  port: process.env.PORT || 5500,
  /**
   * Database
   */
  database: {
    url: process.env.DATABASE_URL,
  },

  /**
   * Api
   */
  api: {
    prefix: '/api',
    version: process.env.API_VERSION,
    headerSecretKey: process.env.HEADER_API_SECRET_KEY,
  },
};
