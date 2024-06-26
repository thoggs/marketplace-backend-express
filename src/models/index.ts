import { Sequelize } from 'sequelize';
import User from './user';
import { sequelize } from "../config/database";
import Product from './product';

const db: { [key: string]: any } = {
  Sequelize,
  sequelize,
  User,
  Product,
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].initModel) {
    db[modelName].initModel(sequelize);
  }
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
