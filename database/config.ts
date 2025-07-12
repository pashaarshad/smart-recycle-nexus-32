// Database configuration for Smart Recycle Nexus
// This file contains the database connection settings

export const dbConfig = {
  host: 'localhost',
  user: 'arshad',
  password: 'arshad', // In production, use environment variables
  database: 'userData58',
  port: 3306,
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Environment-based configuration
export const getDbConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return {
        ...dbConfig,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'arshad',
        database: process.env.DB_NAME || 'userData58'
      };
    case 'test':
      return {
        ...dbConfig,
        database: 'userData58_test'
      };
    default:
      return dbConfig;
  }
};

export default dbConfig;
