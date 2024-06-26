import { Sequelize } from 'sequelize';
import User from './user';
import { sequelize } from "../config/database";

interface DB {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  User: typeof User;
}

const db: DB = {
  Sequelize,
  sequelize,
  User,
};

export default db;
