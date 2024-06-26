import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import db from "../app/models";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
  }
);

async function initializeDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('Database authenticated successfully!');

    await db.sequelize.sync();
    console.log('Database synchronized successfully!');

  } catch (error) {
    console.error('Unable to connect to the database!');
    console.error(error);
    process.exit(1);
  }
}

export { sequelize, initializeDatabase };
